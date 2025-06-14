package com.microservice.comment.microservice_comment.service;

import com.microservice.comment.microservice_comment.model.Comment;
import com.microservice.comment.microservice_comment.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Integer userId, String content, Integer comentarioPadreId) {
        if (comentarioPadreId != null) {
            Optional<Comment> parentComment = commentRepository.findById(comentarioPadreId);
            if (parentComment.isEmpty()) {
                throw new IllegalArgumentException("El comentario padre no existe");
            }
        }

        Comment comment = new Comment(userId, content, comentarioPadreId);
        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public List<Comment> getParentComments() {
        return commentRepository.findByComentarioPadreIdIsNullOrderByFechaCreacionDesc();
    }

    public List<Comment> getRepliesByParentId(Integer parentId) {
        return commentRepository.findByComentarioPadreIdOrderByFechaCreacionAsc(parentId);
    }

    public List<Comment> getCommentsByUserId(Integer userId) {
        return commentRepository.findByIdUsuarioOrderByFechaCreacionDesc(userId);
    }

    public boolean deleteComment(Integer commentId, Integer userId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent() && comment.get().getIdUsuario().equals(userId)) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }

    public long countReplies(Integer parentId) {
        return commentRepository.countByComentarioPadreId(parentId);
    }

    @Transactional
    public void reportComment(Integer commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new EntityNotFoundException("Comentario no encontrado"));
        comment.setReporteCuenta(comment.getReporteCuenta() + 1);

        if(comment.getReporteCuenta() >= 3){
            commentRepository.delete(comment);
        }else{
            commentRepository.save(comment);
        }
    }

}