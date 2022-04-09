package com.example.smartmedicalregistry.service;

import com.example.smartmedicalregistry.entity.Serial;
import com.example.smartmedicalregistry.repository.MappingRepo;
import com.example.smartmedicalregistry.repository.SerialRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SerialService {
    private final SerialRepo serialRepo;
    private final MappingRepo mappingRepo;

    public SerialService(SerialRepo serialRepo, MappingRepo mappingRepo) {
        this.serialRepo = serialRepo;
        this.mappingRepo = mappingRepo;
    }

    public void save(Serial serial) {
        serial.setDoctor(mappingRepo.findByCompounder(serial.getCompounder()).getDoctor());
        serialRepo.save(serial);
    }

    public List<Serial> getAllSerialForCompounder(String username, String date) {
        return serialRepo.findAllByCompounderAndDate(username, date);
    }

    public List<Serial> getAllSerialForDoctor(String username, String date) {
        return serialRepo.findAllByDoctorAndDate(username,date);
    }
}
