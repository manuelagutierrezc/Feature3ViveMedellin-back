package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblbarrios_medellin")
public class BarrioMedellin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_barrio")
    private Integer idBarrio;

    @Column(name = "nombre_barrio", nullable = false, unique = true, length = 50)
    private String nombreBarrio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comuna", nullable = false)
    private ComunaMedellin comuna;

    // Constructor por defecto
    public BarrioMedellin() {
    }

    // Constructor con parámetros
    public BarrioMedellin(String nombreBarrio, ComunaMedellin comuna) {
        this.nombreBarrio = nombreBarrio;
        this.comuna = comuna;
    }

    // Getters y setters
    public Integer getIdBarrio() {
        return idBarrio;
    }

    public void setIdBarrio(Integer idBarrio) {
        this.idBarrio = idBarrio;
    }

    public String getNombreBarrio() {
        return nombreBarrio;
    }

    public void setNombreBarrio(String nombreBarrio) {
        this.nombreBarrio = nombreBarrio;
    }

    public ComunaMedellin getComuna() {
        return comuna;
    }

    public void setComuna(ComunaMedellin comuna) {
        this.comuna = comuna;
    }
}
