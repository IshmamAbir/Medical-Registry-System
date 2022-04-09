package com.example.smartmedicalregistry.dto;

import com.example.smartmedicalregistry.entity.Bkash;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class BkashMappingDto {
    private long bkashMapId;
    private String patientId;
    private String mobile;
    private String pin;

}
