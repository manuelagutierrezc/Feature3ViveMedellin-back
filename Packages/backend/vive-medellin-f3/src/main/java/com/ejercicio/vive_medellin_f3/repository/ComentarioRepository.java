package com.ejercicio.vive_medellin_f3.repository;

import com.ejercicio.vive_medellin_f3.model.Comentario;
import com.ejercicio.vive_medellin_f3.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    //comentarios por evento
    List<Comentario> findByEventoIdEvento(Integer idEvento);

    //comentario siguiente
    List<Comentario> findByComentarioPadre(Comentario comentarioPadre);



}
