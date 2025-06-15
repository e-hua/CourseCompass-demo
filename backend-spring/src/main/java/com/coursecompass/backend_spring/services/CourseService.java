package com.coursecompass.backend_spring.services;
import com.coursecompass.backend_spring.dto.CoursePreviewFilter;
import com.coursecompass.backend_spring.entities.Course;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CourseService {
    Course createCourse(Course course);
    Optional<Course> readCourseById(String id);
    List<Course> readCourseById(Set<String> moduleCodes);
    List<Course> readAllCourses();
    Course updateCourse(String id, Course updatedCourse);
    void deleteCourse(String id);
}
