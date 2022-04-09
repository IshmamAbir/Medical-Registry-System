package com.example.smartmedicalregistry.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.util.List;

@Getter
@Setter
public class TestDto {
    private long testId;
    private String testName;
    private double cost;
    private List<String> day;
    private String testDay;
    private String time;
    private String prerequisite;
}
