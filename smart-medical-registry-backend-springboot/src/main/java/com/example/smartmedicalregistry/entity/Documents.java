package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "documents")
@Setter
@Getter
@NoArgsConstructor
public class Documents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long documentsId;
    @Column
    private String patientId;
    @Column
    private String description;
    @Column
    private String type;
    @Column
    private long imageId;
}
