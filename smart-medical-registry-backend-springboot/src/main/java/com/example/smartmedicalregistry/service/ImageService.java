package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.entity.Documents;
import com.example.smartmedicalregistry.entity.Image;
import com.example.smartmedicalregistry.repository.DocumentsRepo;
import com.example.smartmedicalregistry.repository.ImageRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepo imageRepo;
    private final DocumentsRepo documentsRepo;

    public ImageService(ImageRepo imageRepo, DocumentsRepo documentsRepo) {
        this.imageRepo = imageRepo;
        this.documentsRepo = documentsRepo;
    }

    public Image saveImage(Image image) {
        return imageRepo.save(image);
    }

    public void saveImageDocuments(Documents documents) {
        documentsRepo.save(documents);
    }

    public Image getImage(long imageId){
        return imageRepo.findById(imageId).get();
    }


    public List<Documents> getPatientAllDocuments(String patientId) {
        return documentsRepo.findAllByPatientId(patientId);
    }

    public List<Documents> getPatientAllPrescription(String patientId) {
        return documentsRepo.findAllByPatientIdAndType(patientId,"Prescription");
    }

    public List<Documents> getPatientAllReport(String patientId) {
        return documentsRepo.findAllByPatientIdAndType(patientId,"Report");
    }
}
