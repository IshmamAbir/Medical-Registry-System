package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.ImageSaveDto;
import com.example.smartmedicalregistry.dto.PatientTestDto;
import com.example.smartmedicalregistry.dto.ResponseDto;
import com.example.smartmedicalregistry.dto.TestDto;
import com.example.smartmedicalregistry.entity.*;
import com.example.smartmedicalregistry.service.BkashService;
import com.example.smartmedicalregistry.service.EmailService;
import com.example.smartmedicalregistry.service.TestService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/test")
@CrossOrigin
public class TestController {

    private final TestService testService;
    private final BkashService bkashService;
    private final EmailService emailService;

    public TestController(TestService testService, BkashService bkashService, EmailService emailService) {
        this.testService = testService;
        this.bkashService = bkashService;
        this.emailService = emailService;
    }

    @PostMapping("/")
    public ResponseEntity<?> saveTest(@RequestBody TestDto testDto) {
        ResponseDto response;
        if (testService.isTestExist(testDto.getTestName())) {
            response = new ResponseDto("Exist");
        } else {
            Test test = new Test();
            BeanUtils.copyProperties(testDto, test);

            StringBuilder concatDay = new StringBuilder();
            for (String day : testDto.getDay()) {
                concatDay.append(day + ", ");
            }
            test.setDay(concatDay.toString());
            testService.save(test);
            response = new ResponseDto("Save");
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-test")
    public ResponseEntity<?> getAllSerial() {
        List<Test> testList = testService.getAllTest();
        return ResponseEntity.ok(this.getTestDtoList(testList));
    }

    @GetMapping("/{testId}")
    public ResponseEntity<?> getTestInfo(@PathVariable("testId") long testId) {
        Test test = testService.getTestInfo(testId);
        TestDto testDto = new TestDto();
        BeanUtils.copyProperties(test, testDto);
        testDto.setTestDay(test.getDay());
        return ResponseEntity.ok(testDto);
    }

    @PostMapping("/patient-test")
    public ResponseEntity<?> savePatientTest(@RequestBody PatientTestDto patientTestDto) {
        PatientTest patientTest = new PatientTest();
        BeanUtils.copyProperties(patientTestDto, patientTest);
        patientTest.setTestList(getTestList(patientTestDto.getTestDtoList()));
        if (patientTestDto.getPay() >= patientTestDto.getTotalCost()) {
            patientTest.setStatus("Paid");
        } else {
            patientTest.setStatus("Due");
        }
        testService.savePatientTestList(patientTest);
        return ResponseEntity.ok(new ResponseDto("Save"));
    }

    @GetMapping("/get-due-tests")
    public ResponseEntity<?> getAllDueTest() {
        List<PatientTest> patientTestDueList = testService.getPatientTests("Due");
        return ResponseEntity.ok(this.getPatientTestDtoList(patientTestDueList));
    }

    @GetMapping("/patient-due-test/{username}")
    public ResponseEntity<?> getPatientAllDueTest(@PathVariable("username") String username) {
        List<PatientTest> patientTestDueList = testService.getPatientAllDueTest(username, "Due");
        return ResponseEntity.ok(this.getPatientTestDtoList(patientTestDueList));
    }

    @GetMapping("/get-paid-tests")
    public ResponseEntity<?> getAllPaidTest() {
        List<PatientTest> patientTestDueList = testService.getPatientTests("Paid");
        return ResponseEntity.ok(this.getPatientTestDtoList(patientTestDueList));
    }

    @GetMapping("/due-payment/{patientTestId}")
    public ResponseEntity<?> duePayment(@PathVariable("patientTestId") long patientTestId) {
        testService.duePayment(patientTestId);
        return ResponseEntity.ok(new ResponseDto("Success"));
    }

    @GetMapping("/payment-by-patient/{patientTestId}")
    public ResponseEntity<?> paymentByPatient(@PathVariable("patientTestId") long patientTestId) throws MessagingException, IOException {
        PatientTest patientTest = testService.getPatientTestInfo(patientTestId);
        BkashMapping bkashMapping = bkashService.getPatientBkash(patientTest.getPatientId());

        double payment = patientTest.getTotalCost() - patientTest.getPay();

        StringBuilder concatTestDetails = new StringBuilder();
        for (Test test : patientTest.getTestList()) {
            concatTestDetails.append(test.getTestName() + " - " + test.getCost() + " TK\n");
        }

        StringBuilder concatEmailBody = new StringBuilder();
        concatEmailBody.append(patientTest.getPatientName() + " Due Payment " + payment + "/- Tk. Paid From " + bkashMapping.getBkash().getMobileNo() + "\n\nTest Details:\n" + concatTestDetails);

        testService.paymentByPatient(patientTest, concatEmailBody);
        return ResponseEntity.ok(new ResponseDto("Success"));
    }

    @GetMapping("/get-patient-test-info/{patientTestId}")
    public ResponseEntity<?> getPatientTestInfo(@PathVariable("patientTestId") long patientTestId) {
        PatientTest patientTest = testService.getPatientTestInfo(patientTestId);

        PatientTestDto patientTestDto = new PatientTestDto();
        BeanUtils.copyProperties(patientTest, patientTestDto);
        patientTestDto.setTestDtoList(this.getTestDtoList(patientTest.getTestList()));

        return ResponseEntity.ok(patientTestDto);
    }

    @GetMapping("/inform/{patientTestId}")
    public ResponseEntity<?> informPatientAboutTestReport(@PathVariable("patientTestId") long patientTestId) throws MessagingException, IOException {
        PatientTest patientTest = testService.getPatientTestInfo(patientTestId);
        patientTest.setStatus("Ready");
        StringBuilder concatTestDetails = new StringBuilder();
        for (Test test : patientTest.getTestList()) {
            concatTestDetails.append(test.getTestName() + " - " + test.getCost() + " TK\n");
        }

        StringBuilder concatEmailBody = new StringBuilder();
        concatEmailBody.append(patientTest.getPatientName() + " Your Test Reports Are Ready.\n\nTest Details:\n" + concatTestDetails);

        testService.informPatientAboutTestReport(patientTest, concatEmailBody);
        testService.savePatientTestList(patientTest);
        return ResponseEntity.ok(new ResponseDto("Send"));
    }

    /*-------------------------HELPER METHOD-------------------------*/
    private List<PatientTestDto> getPatientTestDtoList(List<PatientTest> patientTestDueList) {
        List<PatientTestDto> patientTestDtoList = new ArrayList<>();
        for (PatientTest patientTest : patientTestDueList) {
            PatientTestDto patientTestDto = new PatientTestDto();
            BeanUtils.copyProperties(patientTest, patientTestDto);

            patientTestDto.setTestDtoList(this.getTestDtoList(patientTest.getTestList()));

            patientTestDtoList.add(patientTestDto);
        }
        return patientTestDtoList;
    }


    private List<Test> getTestList(List<TestDto> testDtoList) {
        List<Test> testList = new ArrayList<>();
        for (TestDto testDto : testDtoList) {
            Test test = new Test();
            BeanUtils.copyProperties(testDto, test);
            testList.add(test);
        }
        return testList;
    }


    private List<TestDto> getTestDtoList(List<Test> testList) {
        List<TestDto> testDtoList = new ArrayList<>();
        for (Test test : testList) {
            TestDto testDto = new TestDto();
            BeanUtils.copyProperties(test, testDto);
            testDto.setTestDay(test.getDay());
            testDtoList.add(testDto);
        }
        return testDtoList;
    }

}
