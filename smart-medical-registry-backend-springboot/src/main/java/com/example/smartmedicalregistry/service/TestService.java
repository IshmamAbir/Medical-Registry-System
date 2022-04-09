package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.entity.Email;
import com.example.smartmedicalregistry.entity.PatientTest;
import com.example.smartmedicalregistry.entity.Test;

import com.example.smartmedicalregistry.repository.PatientTestRepo;
import com.example.smartmedicalregistry.repository.TestRepo;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

@Service
public class TestService {
    private final TestRepo testRepo;
    private final PatientTestRepo patientTestRepo;
    private final EmailService emailService;

    public TestService(TestRepo testRepo, PatientTestRepo patientTestRepo, EmailService emailService) {
        this.testRepo = testRepo;
        this.patientTestRepo = patientTestRepo;
        this.emailService = emailService;
    }

    public boolean isTestExist(String testName) {
        Test test = testRepo.findByTestName(testName);
        if (test != null) {
            return true;
        } else {
            return false;
        }
    }

    public void save(Test test) {
        testRepo.save(test);
    }

    public List<Test> getAllTest() {
        return testRepo.findAll();
    }

    public Test getTestInfo(long testId) {
        return testRepo.getById(testId);
    }

    public void savePatientTestList(PatientTest patientTest) {
        patientTestRepo.save(patientTest);
    }


    public void duePayment(long patientTestId) {
        PatientTest patientTest = patientTestRepo.getById(patientTestId);
        patientTest.setStatus("Paid");
        patientTest.setPay(patientTest.getTotalCost());
        patientTestRepo.save(patientTest);
    }

    public List<PatientTest> getPatientTests(String status) {
        return patientTestRepo.findAllByStatus(status);
    }

    public PatientTest getPatientTestInfo(long patientTestId) {
        return patientTestRepo.getById(patientTestId);
    }

    public void informPatientAboutTestReport(PatientTest patientTest, StringBuilder emailBody) throws MessagingException, IOException {
        Email email = new Email();
        email.setEmailTo(patientTest.getEmail());
        email.setEmailSubject("Test Report Ready Confirmation");
        email.setEmailBody(emailBody.toString());
        emailService.sendEmail(email);
    }

    public List<PatientTest> getPatientAllDueTest(String username, String status) {
        return patientTestRepo.findAllByPatientIdAndStatus(username, status);
    }


    public void paymentByPatient(PatientTest patientTest, StringBuilder emailBody) throws MessagingException, IOException {
        Email email = new Email();
        email.setEmailTo(patientTest.getEmail());
        email.setEmailSubject("Payment Confirmation");
        email.setEmailBody(emailBody.toString());
        emailService.sendEmail(email);

        patientTest.setStatus("Paid");
        patientTest.setPay(patientTest.getTotalCost());
        patientTestRepo.save(patientTest);
    }
}
