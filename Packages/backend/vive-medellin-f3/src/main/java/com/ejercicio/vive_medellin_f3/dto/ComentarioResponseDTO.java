package com.ejercicio.vive_medellin_f3.dto;

public class ComentarioResponseDTO {
    private Integer idComentario;
    private String contenido;
    private String nombreUsuario;
    private Integer idComentarioPadre;

    //constructor getters, setters
    public ComentarioResponseDTO() {
    }

    public ComentarioResponseDTO(Integer idComentario, String contenido, String nombreUsuario, Integer idComentarioPadre) {
        this.idComentario = idComentario;
        this.contenido = contenido;
        this.nombreUsuario = nombreUsuario;
        this.idComentarioPadre = idComentarioPadre;
    }

    public Integer getIdComentario() {
        return idComentario;
    }

    public void setIdComentario(Integer idComentario) {
        this.idComentario = idComentario;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public Integer getIdComentarioPadre() {
        return idComentarioPadre;
    }

    public void setIdComentarioPadre(Integer idComentarioPadre) {
        this.idComentarioPadre = idComentarioPadre;
    }
}
