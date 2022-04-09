package com.example.smartmedicalregistry.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class MedicalDataDto {
    private long dataId;
    private String patientId;
    private String reading;
    private String type;
    private String date;
    private String time;
}
