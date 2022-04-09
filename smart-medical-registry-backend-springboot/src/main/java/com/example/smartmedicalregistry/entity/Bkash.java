package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Bkash")
@Setter
@Getter
@NoArgsConstructor
public class Bkash {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bkashId;
    @Column
    private String mobileNo;
    @Column
    private String pin;
    @Column
    private double amount;

    public Bkash(String mobileNo, String pin, double amount) {
        this.mobileNo = mobileNo;
        this.pin = pin;
        this.amount = amount;
    }
}
