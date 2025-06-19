package com.coursecompass.backend_spring.services;

import com.coursecompass.backend_spring.dto.comments.CommentCreateDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReadDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReplyCreateDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.services.comments.CommentReplyService;
import com.coursecompass.backend_spring.services.comments.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DummyDataService {
  private final UserService userService;
  private final CourseService courseService;
  private final TakenCourseService takenCourseService;
  private final CourseRatingService courseRatingService;
  private final CommentService commentService;
  private final CommentReplyService commentReplyService;

  @Transactional
  public void insertDummyComment() {
    String dummyEmail = "dummy@example.com";
    String targetCourseCode = "ABM5001";

    User user = userService.readAllUsers().stream()
            .filter(u -> dummyEmail.equals(u.getEmail()))
            .findFirst()
            .orElseGet(() -> {

              User newUser = new User();
              newUser.setEmail(dummyEmail);
              newUser.setUserName("John");
              newUser.setTakenCourses(new ArrayList<>());
              newUser.setCourseRatings(new ArrayList<>());
              return userService.createUser(newUser);
            });

    Course course = courseService.readAllCourses().stream()
            .filter(c -> targetCourseCode.equals(c.getId()))
            .findFirst()
            .orElseGet(() ->{
              Course newCourse = new Course(
                      targetCourseCode,
                      0.0,
                      0.0,
                      0.0,
                      0,
                      new ArrayList<>());
              return courseService.createCourse(newCourse);
            });

    TakenCourse takenCourse = takenCourseService.readAllTakenCourses().stream()
            .filter(tc -> tc.getUser().getId().equals(user.getId()) && tc.getCourse().getId().equals(course.getId()))
            .findFirst()
            .orElseGet(() -> {
              TakenCourse newTakenCourse = new TakenCourse();
              newTakenCourse.setCourse(course);
              newTakenCourse.setUnits(2);
              newTakenCourse.setLetterGrade("A+");
              newTakenCourse.setSemesterIndex(1);
              newTakenCourse.setUser(user);
              return takenCourseService.createTakenCourse(newTakenCourse);
            });

    CourseRating courseRating = courseRatingService.readAllCourseRatings().stream()
            .filter(r -> r.getUser().getId().equals(user.getId()) && r.getCourse().getId().equals(course.getId()))
            .findFirst()
            .orElseGet(() -> {
              CourseRating newCourseRating = new CourseRating();
              newCourseRating.setCourse(course);
              newCourseRating.setUser(user);
              newCourseRating.setCourseCode(targetCourseCode);
              newCourseRating.setAverageWorkload(5);
              newCourseRating.setEnjoyability(5);
              newCourseRating.setDifficulty(5);
              return courseRatingService.createCourseRating(newCourseRating);
            });

    List<CommentReadDTO> existingComments = commentService.readCommentsByCourseCode(targetCourseCode);
    boolean alreadyCommented = existingComments.stream()
            .anyMatch(comment -> comment.getAuthorUsername().equals(user.getUserName()));

    if (alreadyCommented) {
      System.out.println("Dummy comment already exists for user.");
      return;
    }

    CommentCreateDTO dummy = new CommentCreateDTO(
            takenCourse.getId(),
            "This is a dummy message"
    );

    commentService.createComment(user.getId(), dummy);

    CommentReadDTO comment = commentService.readCommentsByCourseCode(targetCourseCode).stream()
            .filter(c -> c.getAuthorEmail().equals(dummyEmail))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Comment not found for dummy user"));

    CommentReplyCreateDTO commentReplyCreateDTO = new CommentReplyCreateDTO(
            comment.getId(),
            "@John thanks for the comment! This is a dummy reply."
    );

    commentReplyService.createCommentReply(user.getId(), commentReplyCreateDTO);
    System.out.println("Dummy comment inserted !");
  }
}
