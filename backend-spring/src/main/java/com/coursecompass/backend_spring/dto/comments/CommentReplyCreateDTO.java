package com.coursecompass.backend_spring.dto.comments;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentReplyCreateDTO {
  private Long commentId;
  private String content;
}
