package com.ejercicio.vive_medellin_f3.repository;

import com.ejercicio.vive_medellin_f3.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    //ya tengo el findAll(), y el .findById(id)
}
