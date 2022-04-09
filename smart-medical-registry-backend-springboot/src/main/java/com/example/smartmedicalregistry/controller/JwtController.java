package com.example.smartmedicalregistry.controller;

import com.example.smartmedicalregistry.dto.JwtRequest;
import com.example.smartmedicalregistry.dto.JwtResponse;
import com.example.smartmedicalregistry.service.JwtUtilService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtilService jwtUtilService;

    public JwtController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtilService jwtUtilService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtilService = jwtUtilService;
    }

    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        /* Try Catch code,to find the authenticate user & The username and password is valid or not */
        try {
            this.authenticationManager.authenticate
                    (new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
        }/*-----Use another catch here for disable user if User have isEnable property----*/
        catch (BadCredentialsException e) {
            throw new Exception("Bad Credentials!!!!!!!!!!!!!");
        }

        /* --To get the User details If the User is authenticated & username and password is valid-- */
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());

        /* --Generate Token with the help of User Details-- */
        JwtResponse token = new JwtResponse(this.jwtUtilService.generateToken(userDetails));

        return ResponseEntity.ok(token);
    }

}