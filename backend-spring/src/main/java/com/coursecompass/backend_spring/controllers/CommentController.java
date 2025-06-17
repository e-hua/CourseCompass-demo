package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.dto.CommentCreateDTO;
import com.coursecompass.backend_spring.dto.CommentReadDTO;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;
  private final UserRepository userRepository;
  private final GoogleTokenVerifier googleTokenVerifier;

  @PostMapping
  public ResponseEntity<?> createComment(
          @RequestHeader("Authorization") String authorizationHeader,
          @RequestBody CommentCreateDTO commentCreateDTO) {

    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }

    String idToken = authorizationHeader.substring(7);
    try {
      Map<String, Object> claims = googleTokenVerifier.verify(idToken);
      String email = (String) claims.get("email");

      User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));

      CommentReadDTO createdComment = commentService.createComment(user.getId(), commentCreateDTO);
      return ResponseEntity.ok(createdComment);

    } catch (Exception e) {
      return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
    }
  }

  @GetMapping("/{courseCode}")
  public ResponseEntity<?> getCommentsByCourseCode(@PathVariable String courseCode) {
    try {
      List<CommentReadDTO> comments = commentService.readCommentsByCourseCode(courseCode);
      return ResponseEntity.ok(comments);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(Map.of("error", "Failed to fetch comments" + e.getMessage()));
    }
  }
}
