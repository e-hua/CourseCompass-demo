package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.dto.CommentCreateDTO;
import com.coursecompass.backend_spring.dto.CommentReadDTO;
import com.coursecompass.backend_spring.entities.Comment;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.CommentRepository;
import com.coursecompass.backend_spring.repositories.CourseRatingRepository;
import com.coursecompass.backend_spring.repositories.TakenCourseRepository;
import com.coursecompass.backend_spring.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImplementation implements CommentService {
  private final CommentRepository commentRepository;
  private final TakenCourseRepository takenCourseRepository;
  private final CourseRatingRepository courseRatingRepository;

  @Autowired
  public CommentServiceImplementation(CommentRepository commentRepository, TakenCourseRepository takenCourseService, CourseRatingRepository courseRatingRepository) {
    this.commentRepository = commentRepository;
    this.takenCourseRepository = takenCourseService;
    this.courseRatingRepository = courseRatingRepository;
  }

  private CommentReadDTO flattenToDTO(Comment comment) {
    return new CommentReadDTO(
            comment.getId(),
            comment.getContent(),
            comment.getUser().getEmail(),
            comment.getUser().getUserName(),
            comment.getCourseRating().getCourseCode(),
            comment.getTakenCourse().getLetterGrade(),
            comment.getCourseRating().getDifficulty(),
            comment.getCourseRating().getAverageWorkload(),
            comment.getCourseRating().getEnjoyability(),
            comment.getCreatedAt(),
            comment.getUpdatedAt()
    );
  }

  @Override
  public CommentReadDTO createComment(Long userId, CommentCreateDTO dto) {
    TakenCourse takenCourse = takenCourseRepository.findById(dto.getTakenCourseId())
            .orElseThrow(() -> new RuntimeException("Taken course not found"));

    if (commentRepository.findByTakenCourseId(dto.getTakenCourseId()).isPresent()) {
      throw new RuntimeException("Cannot comment on this course due to duplication");
    }

    if (!takenCourse.getUser().getId().equals(userId)) {
      throw new RuntimeException("Cannot delete this comment due to it belongs to another user");
    }

    CourseRating courseRating = courseRatingRepository.findByUser_IdAndCourse_Id(
            userId, takenCourse.getCourse().getId()
    ).orElseThrow(() -> new RuntimeException("Rating not found"));

    User user = takenCourse.getUser();

    Comment comment = new Comment();
    comment.setUser(user);
    comment.setTakenCourse(takenCourse);
    comment.setCourseRating(courseRating);
    comment.setContent(dto.getContent());
    commentRepository.save(comment);

    return flattenToDTO(comment);
  }

  @Override
  public List<CommentReadDTO> readCommentsByCourseCode(String courseCode) {
    return commentRepository.findByCourseRating_courseCode(courseCode).stream()
            .map(this::flattenToDTO)
            .toList();
  }

  @Override
  public void deleteComment(Long userId, CommentCreateDTO dto) {
    TakenCourse takenCourse = takenCourseRepository.findById(dto.getTakenCourseId())
            .orElseThrow(() -> new RuntimeException("Taken course not found"));

    if (commentRepository.findByTakenCourseId(dto.getTakenCourseId()).isEmpty()) {
      throw new RuntimeException("Cannot delete this comment due to it does not exist");
    }

    if (!takenCourse.getUser().getId().equals(userId)) {
      throw new RuntimeException("Cannot delete this comment due to it belongs to another user");
    }

    CourseRating courseRating = courseRatingRepository.findByUser_IdAndCourse_Id(
            userId, takenCourse.getCourse().getId()
    ).orElseThrow(() -> new RuntimeException("Rating not found"));

    Comment comment = commentRepository.findByTakenCourseId(dto.getTakenCourseId()).get();

    commentRepository.delete(comment);
  }

  @Override
  public CommentReadDTO updateComment(Long userId, CommentCreateDTO dto) {
    TakenCourse takenCourse = takenCourseRepository.findById(dto.getTakenCourseId())
            .orElseThrow(() -> new RuntimeException("Taken course not found"));

    if (commentRepository.findByTakenCourseId(dto.getTakenCourseId()).isEmpty()) {
      throw new RuntimeException("Cannot update this comment due to it does not exist");
    }

    if (!takenCourse.getUser().getId().equals(userId)) {
      throw new RuntimeException("Cannot update this comment due to it belongs to another user");
    }

    courseRatingRepository.findByUser_IdAndCourse_Id(
            userId, takenCourse.getCourse().getId()
    ).orElseThrow(() -> new RuntimeException("Rating not found"));

    Comment comment = commentRepository.findByTakenCourseId(dto.getTakenCourseId()).get();

    comment.setContent(dto.getContent());

    commentRepository.save(comment);

    return flattenToDTO(comment);
  }
}
