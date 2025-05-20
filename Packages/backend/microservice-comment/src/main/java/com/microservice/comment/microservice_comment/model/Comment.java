package com.microservice.comment.microservice_comment.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tblcomentarios")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comentario")
    private Integer idComentario;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comentario_padre")
    private Comment comentarioPadre;

    @Column(name = "contenido", nullable = false, columnDefinition = "TEXT")
    private String contenido;

    // Getters y setters
}

