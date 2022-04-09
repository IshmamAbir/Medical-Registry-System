package com.example.smartmedicalregistry.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class ImageDto {
    private long imageId;
    private String fileName;
    private String contentType;
    private byte[] imageByte;
}
