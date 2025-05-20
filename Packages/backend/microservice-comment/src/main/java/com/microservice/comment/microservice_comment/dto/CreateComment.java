package com.microservice.comment.microservice_comment.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateComment {

    private String content;
    private Integer parentCommentId;
}
