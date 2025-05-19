package com.microservice.user.microservice_user.controller;

import com.microservice.user.microservice_user.dto.RegisterRequest;
import com.microservice.user.microservice_user.service.AuthService;
import jakarta.validation.Valid;
import lombok.Data;
import org.apache.logging.log4j.message.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Data
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult bindingResult){

        authService.registerUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
    }
}
