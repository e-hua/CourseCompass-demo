package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
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
                .orElseThrow(() -> new RuntimeException("Cannot find course with ID " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
    }
}
