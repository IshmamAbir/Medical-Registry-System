package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.MappingDto;
import com.example.smartmedicalregistry.dto.ResponseDto;
import com.example.smartmedicalregistry.dto.SerialDto;
import com.example.smartmedicalregistry.entity.Mapping;
import com.example.smartmedicalregistry.entity.Role;
import com.example.smartmedicalregistry.entity.Serial;
import com.example.smartmedicalregistry.entity.User;
import com.example.smartmedicalregistry.service.SerialService;
import com.example.smartmedicalregistry.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/serial")
@CrossOrigin
public class SerialController {
    private final SerialService serialService;
    private final UserService userService;

    public SerialController(SerialService serialService, UserService userService) {
        this.serialService = serialService;
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<?> newSerial(@RequestBody SerialDto serialDto) {
        ResponseDto response;
        if (!userService.isUserExist(serialDto.getId())) {
            response = new ResponseDto("Patient Id Not Found");
        } else {
            Serial serial = new Serial();
            BeanUtils.copyProperties(serialDto, serial);
            serialService.save(serial);
            response = new ResponseDto("Save Successfully");
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-serial/{username}/{date}")
    public ResponseEntity<?> getAllSerial(@PathVariable("username") String username, @PathVariable("date") String date) {
        List<Serial> serialList = serialService.getAllSerialForCompounder(username, date);
        return ResponseEntity.ok(this.getSerialDtoList(serialList));
    }


    @GetMapping("/all-serial-doctor/{username}/{date}")
    public ResponseEntity<?> getAllSerialForDoctor(@PathVariable("username") String username, @PathVariable("date") String date) {
        List<Serial> serialList = serialService.getAllSerialForDoctor(username, date);
        return ResponseEntity.ok(this.getSerialDtoList(serialList));
    }


    /*---------------HELPER METHOD------------------------*/
    private List<SerialDto> getSerialDtoList(List<Serial> serialList) {
        List<SerialDto> serialDtoList = new ArrayList<>();
        for (Serial serial : serialList) {
            SerialDto serialDto = new SerialDto();
            BeanUtils.copyProperties(serial, serialDto);

            serialDtoList.add(serialDto);
        }
        return serialDtoList;
    }


}
