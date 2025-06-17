package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "CommentReplies")
public class CommentReply {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "comment_id")
  private Comment comment;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false, length = 2000)
  // @userName in the front
  private String content;

  @CreationTimestamp
  private LocalDateTime createdAt;
}
