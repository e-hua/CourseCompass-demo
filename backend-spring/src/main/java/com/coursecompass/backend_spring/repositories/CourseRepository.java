package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, String> {
  Optional<Course> findByid(String id);
}
