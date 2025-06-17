package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Comments")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(optional = false)
  @JoinColumn(name = "course_rating_id", unique = true)
  private CourseRating courseRating;

  @OneToOne(optional = false)
  @JoinColumn(name = "taken_course_id", unique = true)
  private TakenCourse takenCourse;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false, length = 3000)
  private String content;

  @CreationTimestamp
  private LocalDateTime createdAt;
}
