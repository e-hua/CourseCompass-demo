package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.TakenCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TakeCourseRepository extends JpaRepository<TakenCourse, Long> {

}
