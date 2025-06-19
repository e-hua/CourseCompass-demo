package com.coursecompass.backend_spring.services.comments;

import com.coursecompass.backend_spring.dto.comments.CommentReplyCreateDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReplyReadDTO;
import com.coursecompass.backend_spring.entities.Comment;
import com.coursecompass.backend_spring.entities.CommentReply;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.CommentReplyRepository;
import com.coursecompass.backend_spring.repositories.CommentRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentReplyServiceImplementation implements CommentReplyService {
  private final CommentReplyRepository commentReplyRepository;
  private final CommentRepository commentRepository;
  private final UserRepository userRepository;

  @Autowired
  public CommentReplyServiceImplementation(
          CommentReplyRepository commentReplyRepository,
          CommentRepository commentRepository,
          UserRepository userRepository
  ) {
    this.commentReplyRepository = commentReplyRepository;
    this.commentRepository = commentRepository;
    this.userRepository = userRepository;
  }

  private CommentReplyReadDTO flattenToDTO(CommentReply commentReply) {
    return new CommentReplyReadDTO(
            commentReply.getId(),
            commentReply.getContent(),
            commentReply.getUser().getEmail(),
            commentReply.getUser().getUserName(),
            commentReply.getComment().getId(),
            commentReply.getCreatedAt(),
            commentReply.getUpdatedAt()
    );
  }

  @Override
  public CommentReplyReadDTO createCommentReply(Long userId, CommentReplyCreateDTO dto) {
    Comment comment = commentRepository.findById(dto.getCommentId())
            .orElseThrow(() -> new RuntimeException("Parent comment not found"));

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    CommentReply commentReply = new CommentReply();
    commentReply.setUser(user);
    commentReply.setComment(comment);
    commentReply.setContent(dto.getContent());

    commentReplyRepository.save(commentReply);
    return flattenToDTO(commentReply);
  }

  @Override
  public List<CommentReplyReadDTO> readCommentsReplyByCommentCode(Long commentId) {
    return commentRepository.findById(commentId)
            .map(x -> x.getReplies())
            .orElseThrow(() -> new RuntimeException("Parent comment not found"))
            .stream()
            .map(this::flattenToDTO)
            .toList();
  }

  @Override
  public void deleteCommentReply(Long userId, CommentReplyCreateDTO dto) {
    CommentReply reply = commentReplyRepository.findByCommentIdOrderByCreatedAtAsc(dto.getCommentId()).stream()
            .filter(r -> r.getUser().getId().equals(userId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Reply not found or not owned by user"));

    commentReplyRepository.delete(reply);
  }

  @Override
  public CommentReplyReadDTO updateComment(Long userId, CommentReplyCreateDTO dto) {
    CommentReply reply = commentReplyRepository.findByCommentIdOrderByCreatedAtAsc(dto.getCommentId()).stream()
            .filter(r -> r.getUser().getId().equals(userId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Reply not found or not owned by user"));

    reply.setContent(dto.getContent());
    commentReplyRepository.save(reply);

    return flattenToDTO(reply);
  }
}
