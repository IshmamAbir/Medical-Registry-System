package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "PatientTest")
@Setter
@Getter
@NoArgsConstructor
public class PatientTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long patientTestId;
    @Column
    private String patientName;
    @Column
    private String patientId;
    @Column
    private String email;
    @Column
    private String deliveryDate;
    @Column
    private double totalCost;
    @Column
    private double pay;
    @Column
    private String status;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "patient_test_list",
            joinColumns = {@JoinColumn(name = "patientTestId")},
            inverseJoinColumns = {@JoinColumn(name = "testId")})
    private List<Test> testList = new ArrayList<>();
}
