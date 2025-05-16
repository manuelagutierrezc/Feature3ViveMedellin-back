package com.ejercicio.vive_medellin_f3.service;

import com.ejercicio.vive_medellin_f3.dto.ComentarioRequestDTO;
import com.ejercicio.vive_medellin_f3.dto.ComentarioResponseDTO;
import com.ejercicio.vive_medellin_f3.model.Comentario;
import com.ejercicio.vive_medellin_f3.model.Evento;
import com.ejercicio.vive_medellin_f3.model.Usuario;
import com.ejercicio.vive_medellin_f3.repository.ComentarioRepository;
import com.ejercicio.vive_medellin_f3.repository.EventoRepository;
import com.ejercicio.vive_medellin_f3.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComentarioServiceImp implements ComentarioService{

    //traemos todas las relacionadas con comentarios
    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoRepository eventoRepository;


    @Override
    public ComentarioResponseDTO crearComentario(ComentarioRequestDTO comentarioRequestDTO) {
        Usuario usuario = usuarioRepository.findById(comentarioRequestDTO.getIdUsuario())
                .orElseThrow(()->new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(comentarioRequestDTO.getIdEvento())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
        Comentario comentarioPadre = null;
        if (comentarioRequestDTO.getIdComentarioPadre() != null) {
            comentarioPadre = comentarioRepository.findById(comentarioRequestDTO.getIdComentarioPadre())
                    .orElseThrow(() -> new RuntimeException("Comentario padre no encontrado"));
        }
        Comentario comentario = new Comentario(usuario, evento, comentarioPadre, comentarioRequestDTO.getContenido());
        Comentario guardado = comentarioRepository.save(comentario);

        return new ComentarioResponseDTO(
                guardado.getIdComentario(),
                guardado.getContenido(),
                guardado.getUsuario().getNombres() + " " + guardado.getUsuario().getApellidos(),
                comentarioPadre != null ? comentarioPadre.getIdComentario() : null
        );
    }

    @Override
    public List<ComentarioResponseDTO> listarComentariosPorEvento(Integer idEvento) {
        List<Comentario> comentarios = comentarioRepository.findByEventoIdEvento(idEvento);

        return comentarios.stream().map(c -> new ComentarioResponseDTO(
                c.getIdComentario(),
                c.getContenido(),
                c.getUsuario().getNombres() + " " + c.getUsuario().getApellidos(),
                c.getComentarioPadre() != null ? c.getComentarioPadre().getIdComentario() : null
        )).collect(Collectors.toList());

    }

    @Override
    public void eliminarComentario(Integer idComentario, Integer idUsuarioSolicitante, boolean esAdmin) {
        Comentario comentario = comentarioRepository.findById(idComentario)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));

        boolean esPropio = comentario.getUsuario().getIdUsuario().equals(idUsuarioSolicitante);

        if (!esPropio && !esAdmin) {
            throw new RuntimeException("No autorizado para eliminar este comentario");
        }

        comentarioRepository.delete(comentario);
    }
}
