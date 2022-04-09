package com.example.smartmedicalregistry.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDetailsDto {
    private String username;
    private String name;
    private String mobile;
    private List<String> roleList;
}