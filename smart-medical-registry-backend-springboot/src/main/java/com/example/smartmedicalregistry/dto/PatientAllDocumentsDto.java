package com.example.smartmedicalregistry.dto;

import com.example.smartmedicalregistry.dto.DocumentsDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PatientAllDocumentsDto {
    private List<DocumentsDto> prescriptionDto;
    private List<DocumentsDto> reportDto;

    private List<MedicalDataDto> diabetesDto;
    private List<MedicalDataDto> bpDto;
}
