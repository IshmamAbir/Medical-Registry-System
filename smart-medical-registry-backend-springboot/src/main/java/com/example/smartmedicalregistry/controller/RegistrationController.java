package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.MappingDto;
import com.example.smartmedicalregistry.dto.ResponseDto;
import com.example.smartmedicalregistry.dto.UserDetailsDto;
import com.example.smartmedicalregistry.dto.UserDto;
import com.example.smartmedicalregistry.entity.Mapping;
import com.example.smartmedicalregistry.entity.User;
import com.example.smartmedicalregistry.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@CrossOrigin
public class RegistrationController {
    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<?> registerNewUser(@RequestBody UserDto userDto) {
        ResponseDto response;
        if (userService.isUserExist(userDto.getUsername())) {
            response = new ResponseDto("Username Already Used");
        } else {
            User user = new User();
            BeanUtils.copyProperties(userDto, user);
            user.setName(userDto.getFirstName() + " " + userDto.getLastName());
            userService.save(user, userDto.getUserType());
            response = new ResponseDto("Save Successfully");
        }
        return ResponseEntity.ok(response);
    }


    @PostMapping("/getDetails")
    public ResponseEntity<?> getDetails(@RequestBody String username) {
        User user = userService.getUserDetails(username);
        UserDetailsDto userDetailsDto = new UserDetailsDto();
        BeanUtils.copyProperties(user, userDetailsDto);
        return ResponseEntity.ok(userDetailsDto);
    }

    @PostMapping("/map")
    public ResponseEntity<?> mapDoctorAndCompounder(@RequestBody MappingDto mappingDto) {
        ResponseDto response;
        if (userService.isUserExist(mappingDto.getDocUsername())) {
            if (userService.isUserExist(mappingDto.getComUsername())) {
                if (userService.isUserExistInMapping(mappingDto.getDocUsername(), "Doctor")) {
                    response = new ResponseDto("Doctor Is Already Mapped");
                } else {
                    if (userService.isUserExistInMapping(mappingDto.getComUsername(), "Compounder")) {
                        response = new ResponseDto("Compounder Is Already Mapped");
                    } else {
                        Mapping mapping = new Mapping();
                        mapping.setDoctor(mappingDto.getDocUsername());
                        mapping.setCompounder(mappingDto.getComUsername());
                        userService.mapDoctorAndCompounder(mapping);
                        response = new ResponseDto("Mapped Successfully");
                    }
                }
            } else {
                response = new ResponseDto("Compounder Is Not Found");
            }
        } else {
            response = new ResponseDto("Doctor Is Not Found");
        }

        return ResponseEntity.ok(response);
    }

}
