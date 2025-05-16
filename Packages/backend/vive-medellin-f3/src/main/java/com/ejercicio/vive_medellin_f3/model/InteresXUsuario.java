package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblinteresesxusuario")
public class InteresXUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_interesxusuario")
    private Integer idInteresXUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    // Constructor por defecto
    public InteresXUsuario() {
    }

    // Constructor con parámetros
    public InteresXUsuario(Usuario usuario, Categoria categoria) {
        this.usuario = usuario;
        this.categoria = categoria;
    }

    // Getters y setters
    public Integer getIdInteresXUsuario() {
        return idInteresXUsuario;
    }

    public void setIdInteresXUsuario(Integer idInteresXUsuario) {
        this.idInteresXUsuario = idInteresXUsuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
