package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "medicalData")
@Setter
@Getter
@NoArgsConstructor
public class MedicalData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dataId;
    @Column
    private String patientId;
    @Column
    private String reading;
    @Column
    private String type;
    @Column
    private String date;
    @Column
    private String time;
}
