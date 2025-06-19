package com.coursecompass.backend_spring.services.comments;

import com.coursecompass.backend_spring.dto.comments.CommentCreateDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReadDTO;

import java.util.List;

public interface CommentService {
  CommentReadDTO createComment(Long userId, CommentCreateDTO dto);
  List<CommentReadDTO> readCommentsByCourseCode(String courseCode);
  void deleteComment(Long userId, CommentCreateDTO dto);
  CommentReadDTO updateComment(Long userId, CommentCreateDTO dto);
}
