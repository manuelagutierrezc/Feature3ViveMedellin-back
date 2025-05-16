package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblnotificaciones")
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notificacion")
    private Integer idNotificacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comentario", nullable = false)
    private Comentario comentario;

    // Constructor por defecto
    public Notificacion() {
    }

    // Constructor con parámetros
    public Notificacion(Comentario comentario) {
        this.comentario = comentario;
    }

    // Getters y setters
    public Integer getIdNotificacion() {
        return idNotificacion;
    }

    public void setIdNotificacion(Integer idNotificacion) {
        this.idNotificacion = idNotificacion;
    }

    public Comentario getComentario() {
        return comentario;
    }

    public void setComentario(Comentario comentario) {
        this.comentario = comentario;
    }
}
