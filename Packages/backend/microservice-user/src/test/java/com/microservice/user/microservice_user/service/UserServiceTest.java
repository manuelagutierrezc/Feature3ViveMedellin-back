package com.microservice.user.microservice_user.service;

import com.microservice.user.microservice_user.enums.RoleList;
import com.microservice.user.microservice_user.model.Role;
import com.microservice.user.microservice_user.model.User;
import com.microservice.user.microservice_user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockUser = new User();
        mockUser.setUserId(1);
        mockUser.setUserName("testUser");
        mockUser.setPassword("password123");
        mockUser.setEmail("email@test.com");
        Role rol = new Role();
        rol.setRole("ROLE_USER");
        mockUser.setRole(rol);
    }

    @Test
    void testLoadUserByUsername() {
        when(userRepository.findByUserName("testUser")).thenReturn(Optional.of(mockUser));
        UserDetails userDetails = userService.loadUserByUsername("testUser");
        assertEquals("testUser", userDetails.getUsername());
        assertEquals("password123", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_USER")));
    }

    @Test
    void testLoadUserByUsernameNotFound() {
        when(userRepository.findByUserName("desconocido")).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername("desconocido"));
    }

    @Test
    void testFindByEmail() {
        when(userRepository.findByEmail("email@test.com")).thenReturn(Optional.of(mockUser));
        User result = userService.findByEmail("email@test.com");
        assertEquals("testUser", result.getUsername());
    }

    @Test
    void findByEmailNotFound() {
        when(userRepository.findByEmail("inexistente@test.com")).thenReturn(Optional.empty());
        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.findByEmail("inexistente@test.com"));
        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testSaveUser () {
        userService.save(mockUser);
        verify(userRepository, times(1)).save(mockUser);
    }
}
