package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.repositories.CourseRepository;
import com.coursecompass.backend_spring.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImplementation implements CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseServiceImplementation(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Optional<Course> readCourseById(String id) {
        return courseRepository.findById(id);
    }

    @Override
    public List<Course> readAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course updateCourse(String id, Course updatedCourse) {
        return courseRepository.findById(id)
                .map(existingCourse -> {
                    existingCourse.setRatings(updatedCourse.getRatings());
                    existingCourse.setAverageDifficulty(updatedCourse.getAverageDifficulty());
                    existingCourse.setAverageWorkload(updatedCourse.getAverageWorkload());
                    existingCourse.setAverageEnjoyability(updatedCourse.getAverageEnjoyability());
                    return courseRepository.save(existingCourse);
                })
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    @Override
    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }
}
