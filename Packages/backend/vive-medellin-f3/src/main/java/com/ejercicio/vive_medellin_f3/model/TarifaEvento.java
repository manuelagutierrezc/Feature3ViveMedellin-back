package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbltarifas_evento")
public class TarifaEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarifa_evento")
    private Integer idTarifaEvento;

    @Column(name = "tarifa_evento", nullable = false, unique = true, length = 50)
    private String tarifaEvento;

    // Constructor por defecto
    public TarifaEvento() {
    }

    // Constructor con parámetro
    public TarifaEvento(String tarifaEvento) {
        this.tarifaEvento = tarifaEvento;
    }

    // Getters y setters
    public Integer getIdTarifaEvento() {
        return idTarifaEvento;
    }

    public void setIdTarifaEvento(Integer idTarifaEvento) {
        this.idTarifaEvento = idTarifaEvento;
    }

    public String getTarifaEvento() {
        return tarifaEvento;
    }

    public void setTarifaEvento(String tarifaEvento) {
        this.tarifaEvento = tarifaEvento;
    }
}
