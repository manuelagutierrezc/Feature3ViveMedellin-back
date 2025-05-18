package com.microservice.user.microservice_user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tblusuarios")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer userId;

    @Column(name = "nombres", nullable = false, length = 50)
    private String firstName;

    @Column(name = "apellidos", nullable = false, length = 50)
    private String lastName;

    @Column(name = "correo", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "contrasena", nullable = false, length = 50)
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rol", nullable = false)
    private Role role;
}
