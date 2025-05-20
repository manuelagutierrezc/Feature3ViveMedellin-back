package com.microservice.user.microservice_user.service;


import com.microservice.user.microservice_user.controller.TokenResponse;
import com.microservice.user.microservice_user.dto.Auth;
import com.microservice.user.microservice_user.dto.LoginRequest;
import com.microservice.user.microservice_user.dto.RegisterRequest;
import com.microservice.user.microservice_user.enums.RoleList;
import com.microservice.user.microservice_user.jwt.JwtUtil;
import com.microservice.user.microservice_user.model.Role;
import com.microservice.user.microservice_user.model.User;
import com.microservice.user.microservice_user.repository.RoleRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public void registerUser(RegisterRequest registerRequest) {

        Role role = roleRepository.findByRole(RoleList.ROLE_USER.name()).orElseThrow(() -> new RuntimeException("Role not found"));
        User user = new User(registerRequest.userName, registerRequest.email, passwordEncoder.encode(registerRequest.password), role);
        userService.save(user);

    }

    public Auth login(LoginRequest loginRequest){
        authenticate(loginRequest.email, loginRequest.password);

        User user = userService.findByEmail(loginRequest.email);

        String token = jwtUtil.generateToken(user);
        return new Auth(token);
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

    public String getUsernameFromToken(String token) {
        return jwtUtil.getUsernameFromToken(token);
    }
}