package com.microservice.comment.microservice_comment.service;

import com.microservice.comment.microservice_comment.model.Comment;
import com.microservice.comment.microservice_comment.repository.CommentRepository;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.List;
import java.util.Optional;

public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveComment() {
        Comment padre = new Comment();
        padre.setIdComentario(1);
        when(commentRepository.findById(1)).thenReturn(Optional.of(padre));
        when(commentRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        Comment result = commentService.saveComment(10, "contenido", 1);
        assertEquals("contenido", result.getContenido());
        assertEquals(10, result.getIdUsuario());
    }

    @Test
    void testGetSizeAllComments() {
        Comment comment1 = new Comment(1, "contenido1", null);
        Comment comment2 = new Comment(1, "contenido2", null);
        when(commentRepository.findAll()).thenReturn(List.of(comment1, comment2));
        List<Comment> result = commentService.getAllComments();
        assertEquals(2, result.size());
    }

    @Test
    void testGetSizeParentComment() {
        Comment comment = new Comment(1, "comentariopadre", null);
        when(commentRepository.findByComentarioPadreIdIsNullOrderByFechaCreacionDesc()).thenReturn(List.of(comment));
        List <Comment> result = commentService.getParentComments();
        assertEquals(1, result.size());
    }

    @Test
    void  testGetCommentsByUserId() {
        Comment comment = new Comment(1, "contenido", null);
        when(commentRepository.findByIdUsuarioOrderByFechaCreacionDesc(1)).thenReturn(List.of(comment));
        List<Comment> result = commentService.getCommentsByUserId(1);
        assertEquals(1, result.size());
        assertEquals("contenido", result.get(0).getContenido());
    }

    @Test
    void testDeleteComment() {
        Comment comment = new Comment(1, "test", null);
        comment.setIdComentario(5);
        when(commentRepository.findById(5)).thenReturn(Optional.of(comment));
        boolean result = commentService.deleteComment(5, 1);
        assertTrue(result);
        verify(commentRepository).deleteById(5);
    }

    @Test
    void testReportComment() {
        Comment comment = new Comment(1, "comentario", null);
        comment.setIdComentario(10);
        comment.setReporteCuenta(1);
        when(commentRepository.findById(10)).thenReturn(Optional.of(comment));
        commentService.reportComment(10);
        assertEquals(2, comment.getReporteCuenta());
        verify(commentRepository).save(comment);
    }
}
