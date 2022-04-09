package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.entity.Bkash;
import com.example.smartmedicalregistry.entity.BkashMapping;
import com.example.smartmedicalregistry.repository.BkashMappingRepo;
import com.example.smartmedicalregistry.repository.BkashRepo;
import org.springframework.stereotype.Service;

@Service
public class BkashService {
    private final BkashRepo bkashRepo;
    private final BkashMappingRepo bkashMappingRepo;

    public BkashService(BkashRepo bkashRepo, BkashMappingRepo bkashMappingRepo) {
        this.bkashRepo = bkashRepo;
        this.bkashMappingRepo = bkashMappingRepo;
    }

    public String saveBkashForPatient(BkashMapping bkashMapping) {
        Bkash bkash = bkashRepo.findByMobileNoAndPin(bkashMapping.getBkash().getMobileNo(), bkashMapping.getBkash().getPin());
        String message;

        if (bkash == null) {
            message = "Bkash Account Not Found";
        } else {
            BkashMapping patientBkashMapping = bkashMappingRepo.findByPatientId(bkashMapping.getPatientId());
            if (patientBkashMapping == null) {
                patientBkashMapping = new BkashMapping();
                patientBkashMapping.setBkash(bkash);
                patientBkashMapping.setPatientId(bkashMapping.getPatientId());
                bkashMappingRepo.save(patientBkashMapping);
                message = "Bkash Account Details Save Successfully";
            } else {
                patientBkashMapping.setBkash(bkash);
                bkashMappingRepo.save(patientBkashMapping);
                message = "Bkash Account Details Update Successfully";
            }
        }
        return message;
    }


    public BkashMapping getPatientBkash(String patientId) {
        if (bkashMappingRepo.existsByPatientId(patientId)) {
            BkashMapping bkashMapping = bkashMappingRepo.findByPatientId(patientId);
            return bkashMapping;
        }else{
            return null;
        }


    }
}
