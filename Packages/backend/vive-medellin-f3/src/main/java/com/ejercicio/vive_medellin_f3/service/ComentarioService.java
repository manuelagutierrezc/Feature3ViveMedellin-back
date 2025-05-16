package com.ejercicio.vive_medellin_f3.service;

import com.ejercicio.vive_medellin_f3.dto.ComentarioRequestDTO;
import com.ejercicio.vive_medellin_f3.dto.ComentarioResponseDTO;

import java.util.List;

public interface ComentarioService {
    ComentarioResponseDTO crearComentario(ComentarioRequestDTO comentarioRequestDTO);
    List<ComentarioResponseDTO> listarComentariosPorEvento(Integer idEvento);
    void eliminarComentario(Integer idComentario, Integer idUsuarioSolicitante, boolean esAdmin);
}
