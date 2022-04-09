package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.BkashMappingDto;
import com.example.smartmedicalregistry.dto.DocumentsDto;
import com.example.smartmedicalregistry.dto.ImageDto;
import com.example.smartmedicalregistry.dto.ResponseDto;
import com.example.smartmedicalregistry.entity.Bkash;
import com.example.smartmedicalregistry.entity.BkashMapping;
import com.example.smartmedicalregistry.entity.Documents;
import com.example.smartmedicalregistry.entity.Image;
import com.example.smartmedicalregistry.service.BkashService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/bkash")
@CrossOrigin
public class BkashController {
    private final BkashService bkashService;

    public BkashController(BkashService bkashService) {
        this.bkashService = bkashService;
    }

    @PostMapping("/map")
    public ResponseEntity<?> savePatientBkashDetails(@RequestBody BkashMappingDto bkashMappingDto) {
        BkashMapping bkashMapping = new BkashMapping();
        bkashMapping.setPatientId(bkashMappingDto.getPatientId());
        Bkash bkash = new Bkash();
        bkash.setMobileNo(bkashMappingDto.getMobile());
        bkash.setPin(bkashMappingDto.getPin());

        bkashMapping.setBkash(bkash);

        return ResponseEntity.ok(new ResponseDto(bkashService.saveBkashForPatient(bkashMapping)));
    }

    @GetMapping("/get-info/{patientId}")
    public ResponseEntity<?> getPatientBkash(@PathVariable("patientId") String patientId) throws IOException {
        BkashMapping bkashMapping = bkashService.getPatientBkash(patientId);
        if (bkashMapping != null) {
            BkashMappingDto bkashMappingDto = new BkashMappingDto();
            bkashMappingDto.setMobile(bkashMapping.getBkash().getMobileNo());
            bkashMappingDto.setBkashMapId(bkashMapping.getBkashMapId());
            return ResponseEntity.ok(bkashMappingDto);
        } else {
            return ResponseEntity.ok(new BkashMapping());
        }
    }


}
