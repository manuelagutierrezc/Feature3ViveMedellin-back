package com.microservice.comment.microservice_comment.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "comentarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idComentario;

    @Column(nullable = false)
    private Integer idUsuario;

    @Column(nullable = false, length = 1000)
    private String contenido;

    // Solo guardamos el ID del comentario padre, no el objeto completo
    @Column(name = "comentario_padre_id")
    private Integer comentarioPadreId;

    // Ocultamos la relación JPA del JSON para evitar la carga completa del objeto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comentario_padre_id", insertable = false, updatable = false)
    @JsonIgnore
    private Comment comentarioPadre;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }

    // Constructor personalizado para crear comentarios sin ID ni fecha
    public Comment(Integer idUsuario, String contenido, Integer comentarioPadreId) {
        this.idUsuario = idUsuario;
        this.contenido = contenido;
        this.comentarioPadreId = comentarioPadreId;
    }

    // Método personalizado para setear el comentario padre y actualizar el ID
    public void setComentarioPadre(Comment comentarioPadre) {
        this.comentarioPadre = comentarioPadre;
        if (comentarioPadre != null) {
            this.comentarioPadreId = comentarioPadre.getIdComentario();
        }
    }
}