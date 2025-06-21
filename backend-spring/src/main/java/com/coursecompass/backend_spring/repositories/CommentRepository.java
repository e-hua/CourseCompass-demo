package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  Optional<Comment> findByTakenCourseId(Long takenCourseId);
  List<Comment> findByCourseRating_courseCode(String courseCode);
}
