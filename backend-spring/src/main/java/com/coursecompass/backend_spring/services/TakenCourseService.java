package com.coursecompass.backend_spring.services;
import com.coursecompass.backend_spring.entities.TakenCourse;

import java.util.List;
import java.util.Optional;

public interface TakenCourseService {
    TakenCourse createTakenCourse(TakenCourse course);
    Optional<TakenCourse> readTakenCourseById(Long id);
    List<TakenCourse> readAllTakenCourses();
    TakenCourse updateTakenCourse(Long id, TakenCourse updatedCourse);
    void deleteTakenCourse(Long id);
}
