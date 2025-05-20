package com.microservice.comment.microservice_comment.service;

import com.microservice.comment.microservice_comment.model.Comment;
import com.microservice.comment.microservice_comment.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Integer userId, String content, Integer comentarioPadreId) {
        Comment comment = new Comment();
        comment.setContenido(content);
        comment.setIdUsuario(userId);

        if (comentarioPadreId != null) {
            commentRepository.findById(comentarioPadreId).ifPresent(comment::setComentarioPadre);
        }

        return commentRepository.save(comment);
    }
}
