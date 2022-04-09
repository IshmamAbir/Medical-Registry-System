package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.UserDetailsDto;
import com.example.smartmedicalregistry.entity.User;
import com.example.smartmedicalregistry.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<?> getCurrentUserDetails(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        UserDetailsDto userDetailsDto = new UserDetailsDto();

        List<String> roleList = new ArrayList<>();
        for (GrantedAuthority role : user.getAuthorities()) {
            roleList.add(role.getAuthority());
        }
        userDetailsDto.setRoleList(roleList);

        BeanUtils.copyProperties(user, userDetailsDto);
        return ResponseEntity.ok(userDetailsDto);
    }

}

