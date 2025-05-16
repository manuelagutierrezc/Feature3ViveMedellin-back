package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblnotificacionesxusuario")
public class NotificacionXUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notificacionxusuario")
    private Integer idNotificacionXUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_notificacion", nullable = false)
    private Notificacion notificacion;

    // Constructor por defecto
    public NotificacionXUsuario() {
    }

    // Constructor con parámetros
    public NotificacionXUsuario(Usuario usuario, Notificacion notificacion) {
        this.usuario = usuario;
        this.notificacion = notificacion;
    }

    // Getters y setters
    public Integer getIdNotificacionXUsuario() {
        return idNotificacionXUsuario;
    }

    public void setIdNotificacionXUsuario(Integer idNotificacionXUsuario) {
        this.idNotificacionXUsuario = idNotificacionXUsuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Notificacion getNotificacion() {
        return notificacion;
    }

    public void setNotificacion(Notificacion notificacion) {
        this.notificacion = notificacion;
    }
}
