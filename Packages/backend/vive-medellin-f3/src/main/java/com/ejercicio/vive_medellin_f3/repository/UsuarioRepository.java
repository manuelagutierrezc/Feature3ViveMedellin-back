package com.ejercicio.vive_medellin_f3.repository;

import com.ejercicio.vive_medellin_f3.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreo(String correo);
    //optional, puede o no retornar algo

    //ya tengo el findAll(), y el .findById(id), etc por defecto

}
