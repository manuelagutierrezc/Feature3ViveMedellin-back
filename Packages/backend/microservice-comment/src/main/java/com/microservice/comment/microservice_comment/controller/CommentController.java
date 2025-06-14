package com.microservice.comment.microservice_comment.controller;

import com.microservice.comment.microservice_comment.dto.CreateComment;
import com.microservice.comment.microservice_comment.jwt.JwtUtil;
import com.microservice.comment.microservice_comment.model.Comment;
import com.microservice.comment.microservice_comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
public class CommentController {

    private final JwtUtil jwtUtil;
    private final CommentService commentService;

    public CommentController(JwtUtil jwtUtil, CommentService commentService) {
        this.jwtUtil = jwtUtil;
        this.commentService = commentService;
    }

    @PostMapping("/crear")
    public ResponseEntity<Comment> createComment(@RequestHeader("Authorization") String header,
                                                 @RequestBody CreateComment content) {
        try {
            String token = header.replace("Bearer ", "");
            Integer userId = jwtUtil.getUserIdFromToken(token);

            Comment newComment = commentService.saveComment(
                    userId,
                    content.getContent(),
                    content.getParentCommentId()
            );
            return ResponseEntity.ok(newComment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/principales")
    public ResponseEntity<List<Comment>> getParentComments() {
        List<Comment> comments = commentService.getParentComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{commentId}/respuestas")
    public ResponseEntity<List<Comment>> getReplies(@PathVariable Integer commentId) {
        List<Comment> replies = commentService.getRepliesByParentId(commentId);
        return ResponseEntity.ok(replies);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer commentId,
                                                @RequestHeader("Authorization") String header) {
        try {
            String token = header.replace("Bearer ", "");
            Integer userId = jwtUtil.getUserIdFromToken(token);

            boolean deleted = commentService.deleteComment(commentId, userId);
            if (deleted) {
                return ResponseEntity.ok("Comentario eliminado");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{commentId}/reportar")
    public ResponseEntity<Void> reportComment(@PathVariable Integer commentId){
        commentService.reportComment(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}