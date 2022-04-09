package com.example.smartmedicalregistry.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentsDto {
    private String patientId;
    private String description;
    private String type;
    private long imageId;
}
