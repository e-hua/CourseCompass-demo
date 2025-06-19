package com.coursecompass.backend_spring.dto.comments;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentCreateDTO {
  private Long takenCourseId;
  private String content;
}
