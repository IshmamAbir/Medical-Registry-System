package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "BkashMapping")
@Setter
@Getter
@NoArgsConstructor
public class BkashMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bkashMapId;
    @Column
    private String patientId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "patient_bkash",
            joinColumns = {@JoinColumn(name = "bkashMapId")},
            inverseJoinColumns = {@JoinColumn(name = "bkashId")})
    private Bkash bkash;

}
