package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "test")
@Setter
@Getter
@NoArgsConstructor
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long testId;
    @Column
    private String testName;
    @Column
    private double cost;
    @Column
    private String day;
    @Column
    private String time;
    @Column
    private String prerequisite;

    public Test(String testName, double cost, String day, String time, String prerequisite) {
        this.testName = testName;
        this.cost = cost;
        this.day = day;
        this.time = time;
        this.prerequisite = prerequisite;
    }
}
