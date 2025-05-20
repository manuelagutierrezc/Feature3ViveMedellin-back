package com.microservice.comment.microservice_comment.controller;

import com.microservice.comment.microservice_comment.dto.CreateComment;
import com.microservice.comment.microservice_comment.jwt.JwtUtil;
import com.microservice.comment.microservice_comment.model.Comment;
import com.microservice.comment.microservice_comment.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
    public ResponseEntity<String> createComment(@RequestHeader("Authorization") String header, @RequestBody CreateComment content) {


        String token = header.replace("Bearer ", "");
        Integer userId = jwtUtil.getUserIdFromToken(token);

        Comment new_comment = commentService.saveComment(
                userId,
                content.getContent(),
                content.getParentCommentId()
        );
        return ResponseEntity.ok("Comentario creado");
    }
}
