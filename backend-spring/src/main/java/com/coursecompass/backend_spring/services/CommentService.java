package com.coursecompass.backend_spring.services;

import com.coursecompass.backend_spring.dto.CommentCreateDTO;
import com.coursecompass.backend_spring.dto.CommentReadDTO;

import java.util.List;

public interface CommentService {
  CommentReadDTO createComment(Long userId, CommentCreateDTO dto);
  List<CommentReadDTO> readCommentsByCourseCode(String courseCode);
}
