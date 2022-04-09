package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "mapping")
@Setter
@Getter
@NoArgsConstructor
public class Mapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mapId;

    @Column
    private String doctor;

    @Column
    private String compounder;
}
