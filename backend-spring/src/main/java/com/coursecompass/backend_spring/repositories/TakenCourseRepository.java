package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TakenCourseRepository extends JpaRepository<TakenCourse, Long> {
   List<TakenCourse> findByUser(User user);
}
