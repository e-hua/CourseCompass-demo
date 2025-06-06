package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TakenCourseRepository extends JpaRepository<TakenCourse, Long> {
   List<TakenCourse> findByUser(User user);

   Optional<TakenCourse> findByUserAndCourse(User user, Course course);
}
