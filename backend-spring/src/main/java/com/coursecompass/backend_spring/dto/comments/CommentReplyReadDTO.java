package com.coursecompass.backend_spring.dto.comments;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommentReplyReadDTO {
  private Long id;
  private String content;
  private String authorEmail;
  private String authorUsername;
  // The id of its parent comment
  private Long commentId;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
