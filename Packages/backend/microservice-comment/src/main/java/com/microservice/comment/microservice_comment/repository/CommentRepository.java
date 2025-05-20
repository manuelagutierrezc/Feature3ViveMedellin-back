package com.microservice.comment.microservice_comment.repository;

import com.microservice.comment.microservice_comment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByIdUsuario(Integer idUsuario);
}
