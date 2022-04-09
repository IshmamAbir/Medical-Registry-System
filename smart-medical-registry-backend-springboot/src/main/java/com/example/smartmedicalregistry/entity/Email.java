package com.example.smartmedicalregistry.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "email")
@Getter
@Setter
public class Email{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long emailId;
    @Column
    private String emailTo;
    @Column
    private String emailSubject;
    @Column(length = 10000)
    private String emailBody;
}
