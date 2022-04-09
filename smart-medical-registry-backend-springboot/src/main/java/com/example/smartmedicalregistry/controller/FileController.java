package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.*;
import com.example.smartmedicalregistry.entity.Documents;
import com.example.smartmedicalregistry.entity.Image;
import com.example.smartmedicalregistry.dto.PatientAllDocumentsDto;
import com.example.smartmedicalregistry.entity.MedicalData;
import com.example.smartmedicalregistry.service.ImageService;
import com.example.smartmedicalregistry.service.MedicalDataService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class FileController {
    private final ImageService imageService;
    private final MedicalDataService medicalDataService;

    public FileController(ImageService imageService, MedicalDataService medicalDataService) {
        this.imageService = imageService;
        this.medicalDataService = medicalDataService;
    }

    @GetMapping("/patient-all-docs/{patientId}")
    public ResponseEntity<?> getPatientAllDocuments(@PathVariable("patientId") String patientId) {
        List<Documents> prescriptionList = imageService.getPatientAllPrescription(patientId);
        List<Documents> reportList = imageService.getPatientAllReport(patientId);

        List<MedicalData> diabetesList = medicalDataService.getDataList(patientId, "Diabetes");
        List<MedicalData> bpList = medicalDataService.getDataList(patientId, "BP");

        PatientAllDocumentsDto allDocumentsDto = new PatientAllDocumentsDto();

        allDocumentsDto.setPrescriptionDto(this.getDocumentsDtoList(prescriptionList));
        allDocumentsDto.setReportDto(this.getDocumentsDtoList(reportList));

        allDocumentsDto.setDiabetesDto(this.getMedicalDataDtoList(diabetesList));
        allDocumentsDto.setBpDto(this.getMedicalDataDtoList(bpList));

        return ResponseEntity.ok(allDocumentsDto);
    }


    @PostMapping("/image")
    public ResponseEntity<?> saveImage(@RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        System.out.println("Image size:" + imageFile.getSize());
        Image image = new Image();
        image.setFileName(imageFile.getOriginalFilename());
        image.setContentType(imageFile.getContentType());
        image.setImageByte(compressBytes(imageFile.getBytes()));
        Image savedImage = imageService.saveImage(image);
        ImageSaveDto response = new ImageSaveDto("Successfully Save", savedImage.getImageId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/image/details")
    public ResponseEntity<?> saveImageDetails(@RequestBody DocumentsDto documentsDto) {
        Documents documents = new Documents();
        BeanUtils.copyProperties(documentsDto, documents);
        imageService.saveImageDocuments(documents);

        return ResponseEntity.ok(new ResponseDto("Save"));
    }

    @GetMapping(path = {"/get-image/{imageId}"})
    public ResponseEntity<?> getImage(@PathVariable("imageId") Long imageId) throws IOException {

        Image image = imageService.getImage(imageId);
        ImageDto imageDto = new ImageDto();
        BeanUtils.copyProperties(image, imageDto);
        imageDto.setImageByte(decompressBytes(imageDto.getImageByte()));

        return ResponseEntity.ok(imageDto);
    }

    @PostMapping("/diabetic")
    public ResponseEntity<?> saveDiabetesDetails(@RequestBody MedicalDataDto medicalDataDto) {
        if (Double.parseDouble(medicalDataDto.getReading()) < 40) {
            medicalDataDto.setReading(medicalDataDto.getReading() + " mmol/L");
        } else {
            medicalDataDto.setReading(medicalDataDto.getReading() + " mg/dL");
        }
        medicalDataDto.setType("Diabetes");
        MedicalData medicalData = new MedicalData();
        BeanUtils.copyProperties(medicalDataDto, medicalData);
        medicalDataService.save(medicalData);

        return ResponseEntity.ok(new ResponseDto("Save"));
    }

    @PostMapping("/blood-pressure")
    public ResponseEntity<?> saveBloodPressureDetails(@RequestBody MedicalDataDto medicalDataDto) {
        medicalDataDto.setType("BP");
        MedicalData medicalData = new MedicalData();
        BeanUtils.copyProperties(medicalDataDto, medicalData);
        medicalDataService.save(medicalData);

        return ResponseEntity.ok(new ResponseDto("Save"));
    }

    /*--------------------HELPER METHOD---------------------------*/

    /* compress the image bytes before storing it in the database*/
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    /*uncompress the image bytes before returning it to the angular application*/
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

    /*-----------------------------------------------------------------------*/

    private List<DocumentsDto> getDocumentsDtoList(List<Documents> documentList) {
        List<DocumentsDto> documentsDtoList = new ArrayList<>();
        for (Documents document : documentList) {
            DocumentsDto documentsDto = new DocumentsDto();
            BeanUtils.copyProperties(document, documentsDto);

            documentsDtoList.add(documentsDto);
        }
        return documentsDtoList;
    }

    private List<MedicalDataDto> getMedicalDataDtoList(List<MedicalData> medicalDataList) {
        List<MedicalDataDto> medicalDataDtoList = new ArrayList<>();
        for (MedicalData medicalData : medicalDataList) {
            MedicalDataDto medicalDataDto = new MedicalDataDto();
            BeanUtils.copyProperties(medicalData, medicalDataDto);

            medicalDataDtoList.add(medicalDataDto);
        }
        return medicalDataDtoList;
    }
}

