package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.dto.MedicalDataDto;
import com.example.smartmedicalregistry.entity.MedicalData;
import com.example.smartmedicalregistry.repository.MedicalDataRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalDataService {
    private final MedicalDataRepo medicalDataRepo;

    public MedicalDataService(MedicalDataRepo medicalDataRepo) {
        this.medicalDataRepo = medicalDataRepo;
    }


    public void save(MedicalData medicalData) {
        medicalDataRepo.save(medicalData);
    }

    public List<MedicalData> getDataList(String patientId, String type) {
        return medicalDataRepo.findAllByPatientIdAndType(patientId, type);
    }
}
