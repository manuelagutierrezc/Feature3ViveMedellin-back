package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbleventos_guardadosxusuario")
public class EventoGuardadoXUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento_guardadoxusuario")
    private Integer idEventoGuardadoXUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    // Constructor por defecto
    public EventoGuardadoXUsuario() {
    }

    // Constructor con parámetros
    public EventoGuardadoXUsuario(Usuario usuario, Evento evento) {
        this.usuario = usuario;
        this.evento = evento;
    }

    // Getters y setters
    public Integer getIdEventoGuardadoXUsuario() {
        return idEventoGuardadoXUsuario;
    }

    public void setIdEventoGuardadoXUsuario(Integer idEventoGuardadoXUsuario) {
        this.idEventoGuardadoXUsuario = idEventoGuardadoXUsuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
