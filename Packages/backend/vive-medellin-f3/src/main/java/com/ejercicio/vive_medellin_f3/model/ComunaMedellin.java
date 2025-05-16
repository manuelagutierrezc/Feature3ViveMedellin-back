package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblcomunas_medellin")
public class ComunaMedellin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comuna")
    private Integer idComuna;

    @Column(name = "nombre_comuna", nullable = false, unique = true, length = 50)
    private String nombreComuna;

    // Constructor por defecto
    public ComunaMedellin() {
    }

    // Constructor con parámetro
    public ComunaMedellin(String nombreComuna) {
        this.nombreComuna = nombreComuna;
    }

    // Getters y setters
    public Integer getIdComuna() {
        return idComuna;
    }

    public void setIdComuna(Integer idComuna) {
        this.idComuna = idComuna;
    }

    public String getNombreComuna() {
        return nombreComuna;
    }

    public void setNombreComuna(String nombreComuna) {
        this.nombreComuna = nombreComuna;
    }
}
