package com.coursecompass.backend_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommentReadDTO {
  private Long id;
  private String content;
  private String authorEmail;
  private String authorUsername;
  private String courseCode;
  private String letterGrade;
  private int difficulty;
  private int averageWorkload;
  private int enjoyability;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
