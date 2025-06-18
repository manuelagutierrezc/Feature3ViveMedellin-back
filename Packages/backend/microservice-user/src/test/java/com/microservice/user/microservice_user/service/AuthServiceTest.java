package com.microservice.user.microservice_user.service;

import com.microservice.user.microservice_user.dto.Auth;
import com.microservice.user.microservice_user.dto.LoginRequest;
import com.microservice.user.microservice_user.dto.RegisterRequest;
import com.microservice.user.microservice_user.enums.RoleList;
import com.microservice.user.microservice_user.jwt.JwtUtil;
import com.microservice.user.microservice_user.model.Role;
import com.microservice.user.microservice_user.model.User;
import com.microservice.user.microservice_user.repository.RoleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTest {

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserService userService;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private Role rol;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        rol = new Role(RoleList.ROLE_USER.name());
        user = new User("testUser", "email@test.com", "encodedPass", rol);
    }

    @Test
    void testRegisterUser () {
        RegisterRequest request = new RegisterRequest();
        request.userName = "testUser";
        request.email = "email@test.com";
        request.password = "1234";
        when(roleRepository.findByRole("ROLE_USER")).thenReturn(Optional.of(rol));
        when(passwordEncoder.encode("1234")).thenReturn("encodedPass");
        authService.registerUser(request);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userService).save(userCaptor.capture());
        assertEquals("testUser", userCaptor.getValue().getUsername());
        assertEquals("email@test.com", userCaptor.getValue().getEmail());
        assertEquals("encodedPass", userCaptor.getValue().getPassword());
        assertEquals("ROLE_USER", userCaptor.getValue().getRole().getRole());
    }

    @Test
    void testLoginUser () {
        String email = "email@test.com";
        String password = "1234";
        Role rol = new Role("ROLE_USER");
        User user = new User("testUser", email, "encodedPass", rol);
        LoginRequest request = new LoginRequest(email, password);
        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(userService.findByEmail(email)).thenReturn(user);
        when(jwtUtil.generateToken(user)).thenReturn("token");
        Auth auth = authService.login(request);
        assertEquals("token", auth.getToken());
        assertEquals("testUser", auth.getUserName());
    }

    @Test
    void testGetUsernameFromToken () {
        when(jwtUtil.getUsernameFromToken("token")).thenReturn("email@test.com");
        String username = authService.getUsernameFromToken("token");
        assertEquals("email@test.com", username);
    }
}
