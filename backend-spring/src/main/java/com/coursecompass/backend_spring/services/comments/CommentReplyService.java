package com.coursecompass.backend_spring.services.comments;

import com.coursecompass.backend_spring.dto.comments.CommentReplyCreateDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReplyReadDTO;

import java.util.List;

public interface CommentReplyService {
  CommentReplyReadDTO createCommentReply(Long userId, CommentReplyCreateDTO dto);
  List<CommentReplyReadDTO> readCommentsReplyByCommentCode(Long commentId);
  void deleteCommentReply(Long userId, CommentReplyCreateDTO dto);
  CommentReplyReadDTO updateComment(Long userId, CommentReplyCreateDTO dto);
}
