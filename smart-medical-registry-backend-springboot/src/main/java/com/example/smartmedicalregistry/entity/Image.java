package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "image")
@Setter
@Getter
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;
    @Column
    private String fileName;
    @Column
    private String contentType;
    @Column(name = "imageByte", length = 10000000)
    private byte[] imageByte;
}
