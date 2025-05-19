package com.microservice.user.microservice_user.service;


import com.microservice.user.microservice_user.controller.TokenResponse;
import com.microservice.user.microservice_user.dto.RegisterRequest;
import com.microservice.user.microservice_user.enums.RoleList;
import com.microservice.user.microservice_user.model.Role;
import com.microservice.user.microservice_user.model.User;
import com.microservice.user.microservice_user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleRepository roleRepository;

    public void registerUser(RegisterRequest registerRequest) {

        Role role = roleRepository.findByRole(RoleList.ROLE_USER.name()).orElseThrow(() -> new RuntimeException("Role not found"));
        User user = new User(registerRequest.userName, registerRequest.email, passwordEncoder.encode(registerRequest.password), role);
        userService.save(user);

    }

}