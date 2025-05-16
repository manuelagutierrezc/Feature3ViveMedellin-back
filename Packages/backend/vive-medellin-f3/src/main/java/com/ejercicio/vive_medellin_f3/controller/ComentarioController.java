package com.ejercicio.vive_medellin_f3.controller;

import com.ejercicio.vive_medellin_f3.dto.ComentarioRequestDTO;
import com.ejercicio.vive_medellin_f3.dto.ComentarioResponseDTO;
import com.ejercicio.vive_medellin_f3.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comentarios")
public class ComentarioController {

    @Autowired
    ComentarioService comentarioService;

    // Crear un comentario
    @PostMapping
    public ResponseEntity<ComentarioResponseDTO> crearComentario(@RequestBody ComentarioRequestDTO dto) {
        ComentarioResponseDTO creado = comentarioService.crearComentario(dto);
        return ResponseEntity.ok(creado);
    }
    // Listar comentarios de un evento
    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<List<ComentarioResponseDTO>> obtenerComentariosPorEvento(@PathVariable Integer idEvento) {
        List<ComentarioResponseDTO> comentarios = comentarioService.listarComentariosPorEvento(idEvento);
        return ResponseEntity.ok(comentarios);
    }

    // Eliminar comentario
    @DeleteMapping("/{idComentario}")
    public ResponseEntity<String> eliminarComentario(
            @PathVariable Integer idComentario,
            @RequestParam Integer idUsuarioSolicitante,
            @RequestParam(defaultValue = "false") boolean esAdmin
    ) {
        comentarioService.eliminarComentario(idComentario, idUsuarioSolicitante, esAdmin);
        return ResponseEntity.ok("Comentario eliminado con éxito");
    }
}
