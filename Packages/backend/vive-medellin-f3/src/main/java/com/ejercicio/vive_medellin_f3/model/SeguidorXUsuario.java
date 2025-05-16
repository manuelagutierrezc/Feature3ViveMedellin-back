package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tblseguidoresxusuario")
public class SeguidorXUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_seguidorxusuario")
    private Integer idSeguidorXUsuario;

    // Usuario que sigue
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_seguidor", nullable = false)
    private Usuario usuarioSeguidor;

    // Usuario seguido
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_seguido", nullable = false)
    private Usuario usuarioSeguido;

    @Column(name = "fecha", columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private LocalDate fecha;

    // Constructor por defecto
    public SeguidorXUsuario() {
        this.fecha = LocalDate.now(); // Para simular el DEFAULT CURRENT_DATE
    }

    // Constructor con parámetros
    public SeguidorXUsuario(Usuario usuarioSeguidor, Usuario usuarioSeguido, LocalDate fecha) {
        this.usuarioSeguidor = usuarioSeguidor;
        this.usuarioSeguido = usuarioSeguido;
        this.fecha = fecha != null ? fecha : LocalDate.now();
    }

    // Getters y setters
    public Integer getIdSeguidorXUsuario() {
        return idSeguidorXUsuario;
    }

    public void setIdSeguidorXUsuario(Integer idSeguidorXUsuario) {
        this.idSeguidorXUsuario = idSeguidorXUsuario;
    }

    public Usuario getUsuarioSeguidor() {
        return usuarioSeguidor;
    }

    public void setUsuarioSeguidor(Usuario usuarioSeguidor) {
        this.usuarioSeguidor = usuarioSeguidor;
    }

    public Usuario getUsuarioSeguido() {
        return usuarioSeguido;
    }

    public void setUsuarioSeguido(Usuario usuarioSeguido) {
        this.usuarioSeguido = usuarioSeguido;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}
