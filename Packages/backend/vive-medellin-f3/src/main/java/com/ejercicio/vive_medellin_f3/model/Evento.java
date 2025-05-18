package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbleventos")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Integer idEvento;

    @Column(name = "titulo", nullable = false, length = 50)
    private String titulo;

    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_barrio", nullable = false)
    private BarrioMedellin barrio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tarifa_evento", nullable = false)
    private TarifaEvento tarifaEvento;

    // Constructor por defecto
    public Evento() {
    }

    // Constructor con parámetros
    public Evento(String titulo, String descripcion, LocalDateTime fecha, BarrioMedellin barrio, TarifaEvento tarifaEvento) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.barrio = barrio;
        this.tarifaEvento = tarifaEvento;
    }

    // Getters y setters
    public Integer getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Integer idEvento) {
        this.idEvento = idEvento;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public BarrioMedellin getBarrio() {
        return barrio;
    }

    public void setBarrio(BarrioMedellin barrio) {
        this.barrio = barrio;
    }

    public TarifaEvento getTarifaEvento() {
        return tarifaEvento;
    }

    public void setTarifaEvento(TarifaEvento tarifaEvento) {
        this.tarifaEvento = tarifaEvento;
    }
}
