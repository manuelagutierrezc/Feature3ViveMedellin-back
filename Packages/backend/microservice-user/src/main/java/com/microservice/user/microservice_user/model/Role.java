package com.microservice.user.microservice_user.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tblroles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer roleId;

    @Column(name = "rol", nullable = false, unique = true, length = 50)
    private String role;

    // Constructors
    public Role() {
    }

    public Role(String role) {
        this.role = role;
    }

    // Getters and setters
    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
