package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, String> {

}
