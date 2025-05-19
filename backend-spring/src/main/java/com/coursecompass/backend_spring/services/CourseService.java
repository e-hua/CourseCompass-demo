package com.coursecompass.backend_spring.services;
import com.coursecompass.backend_spring.entities.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course createCourse(Course course);
    Optional<Course> readCourseById(String id);
    List<Course> readAllCourses();
    Course updateCourse(String id, Course updatedCourse);
    void deleteCourse(String id);
}
