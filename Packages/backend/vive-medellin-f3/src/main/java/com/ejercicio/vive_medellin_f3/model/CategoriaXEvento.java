package com.ejercicio.vive_medellin_f3.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tblcategoriasxevento")
public class CategoriaXEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoriaxevento")
    private Integer idCategoriaXEvento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_evento", nullable = false)
    private Evento evento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    // Constructor por defecto
    public CategoriaXEvento() {
    }

    // Constructor con parámetros
    public CategoriaXEvento(Evento evento, Categoria categoria) {
        this.evento = evento;
        this.categoria = categoria;
    }

    // Getters y setters
    public Integer getIdCategoriaXEvento() {
        return idCategoriaXEvento;
    }

    public void setIdCategoriaXEvento(Integer idCategoriaXEvento) {
        this.idCategoriaXEvento = idCategoriaXEvento;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
