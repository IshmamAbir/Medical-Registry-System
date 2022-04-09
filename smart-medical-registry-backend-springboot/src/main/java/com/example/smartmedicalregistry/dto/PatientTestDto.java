package com.example.smartmedicalregistry.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PatientTestDto {
    private long patientTestId;
    private String patientName;
    private String patientId;
    private String email;
    private String deliveryDate;
    private List<TestDto> testDtoList;
    private double totalCost;
    private double pay;
}
