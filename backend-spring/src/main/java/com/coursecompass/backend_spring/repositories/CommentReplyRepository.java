package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.CommentReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentReplyRepository extends JpaRepository<CommentReply, Long> {
  List<CommentReply> findByCommentIdOrderByCreatedAtAsc(Long commentId);
}
