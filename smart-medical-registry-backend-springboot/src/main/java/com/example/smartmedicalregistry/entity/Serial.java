package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "serial")
@Setter
@Getter
@NoArgsConstructor
public class Serial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long serialId;

    @Column
    private String doctor;

    @Column
    private String compounder;

    @Column
    private String patientName;

    @Column
    private String age;

    @Column
    private String gender;

    @Column
    private String mobile;

    @Column
    private String id;

    @Column
    private String date;
}
