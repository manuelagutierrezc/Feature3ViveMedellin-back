package com.microservice.comment.microservice_comment.repository;

import com.microservice.comment.microservice_comment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findAllByOrderByFechaCreacionDesc();

    List<Comment> findByComentarioPadreIdIsNullOrderByFechaCreacionDesc();

    List<Comment> findByComentarioPadreIdOrderByFechaCreacionAsc(Integer comentarioPadreId);

    List<Comment> findByIdUsuarioOrderByFechaCreacionDesc(Integer idUsuario);

    long countByComentarioPadreId(Integer comentarioPadreId);

    boolean existsByComentarioPadreId(Integer comentarioPadreId);
}