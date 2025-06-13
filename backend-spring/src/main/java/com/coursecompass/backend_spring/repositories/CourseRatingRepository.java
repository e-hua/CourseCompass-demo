package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {
    Optional<CourseRating> findByUserAndCourse(User user, Course course);

  List<CourseRating> findByCourseCode(String courseCode);
}
