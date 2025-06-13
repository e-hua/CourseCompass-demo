package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.repositories.CourseRepository;
import com.coursecompass.backend_spring.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final CourseRepository courseRepository;

    @Autowired
    public CourseController(CourseService courseService, CourseRepository courseRepository) {
        this.courseService = courseService;
        this.courseRepository = courseRepository;
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable String id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    @GetMapping
    public List<Course> readAllCourses() {
        return courseService.readAllCourses();
    }

    @GetMapping("/{id}")
    public Course readCourseById(@PathVariable String id) {
        return courseService.readCourseById(id)
                .orElseGet(() -> {
                    Course course = new Course();
                    course.setId(id);
                    course.setAverageEnjoyability(0.0);
                    course.setAverageWorkload(0.0);
                    course.setAverageDifficulty(0.0);
                    course.setRatingCount(0);
                    course.setRatings(new ArrayList<>());
                    return course;
                });
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
    }
}
