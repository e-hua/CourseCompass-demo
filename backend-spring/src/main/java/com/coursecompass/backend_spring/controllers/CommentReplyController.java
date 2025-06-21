package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.dto.comments.CommentReplyCreateDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReplyReadDTO;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.comments.CommentReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/commentReplies")
@RequiredArgsConstructor
public class CommentReplyController {

  private final CommentReplyService commentReplyService;
  private final UserRepository userRepository;
  private final GoogleTokenVerifier googleTokenVerifier;

  @PostMapping
  public ResponseEntity<?> createCommentReply(
          @RequestHeader("Authorization") String authorizationHeader,
          @RequestBody CommentReplyCreateDTO commentReplyCreateDTO) {

    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }

    String idToken = authorizationHeader.substring(7);
    try {
      Map<String, Object> claims = googleTokenVerifier.verify(idToken);
      String email = (String) claims.get("email");

      User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));

      CommentReplyReadDTO createdCommentReply = commentReplyService.createCommentReply(user.getId(), commentReplyCreateDTO);
      return ResponseEntity.ok(createdCommentReply);

    } catch (Exception e) {
      return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
    }
  }

  @DeleteMapping
  public ResponseEntity<?> deleteCommentReply(
          @RequestHeader("Authorization") String authorizationHeader,
          @RequestBody CommentReplyCreateDTO commentReplyCreateDTO) {

    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }

    String idToken = authorizationHeader.substring(7);
    try {
      Map<String, Object> claims = googleTokenVerifier.verify(idToken);
      String email = (String) claims.get("email");

      User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));

      commentReplyService.deleteCommentReply(user.getId(), commentReplyCreateDTO);
      return ResponseEntity.ok(Map.of("success", true));

    } catch (Exception e) {
      return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
    }
  }

  @PutMapping
  public ResponseEntity<?> updateCommentReply(
          @RequestHeader("Authorization") String authorizationHeader,
          @RequestBody CommentReplyCreateDTO commentReplyCreateDTO) {

    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }

    String idToken = authorizationHeader.substring(7);
    try {
      Map<String, Object> claims = googleTokenVerifier.verify(idToken);
      String email = (String) claims.get("email");

      User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));

      CommentReplyReadDTO updatedCommentReply = commentReplyService.updateCommentReply(user.getId(), commentReplyCreateDTO);
      return ResponseEntity.ok(updatedCommentReply);

    } catch (Exception e) {
      return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
    }
  }
  @GetMapping("/{commentCode}")
  public ResponseEntity<?> getCommentRepliesByCommentCode(@PathVariable Long commentCode) {
    try {
      List<CommentReplyReadDTO> commentReplies = commentReplyService.readCommentRepliesByCommentCode(commentCode);
      return ResponseEntity.ok(commentReplies);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Map.of("error", "Failed to fetch comment replies" + e.getMessage()));
    }
  }
}
