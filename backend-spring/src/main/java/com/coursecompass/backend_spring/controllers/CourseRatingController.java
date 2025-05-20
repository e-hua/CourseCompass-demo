package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.services.CourseRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class CourseRatingController {

    private final CourseRatingService courseRatingService;

    @Autowired
    public CourseRatingController(CourseRatingService courseRatingService) {
        this.courseRatingService = courseRatingService;
    }

    @PostMapping
    public CourseRating createCourseRating(@RequestBody CourseRating rating) {
        return courseRatingService.createCourseRating(rating);
    }

    @PutMapping("/{id}")
    public CourseRating updateCourseRating(@PathVariable Long id, @RequestBody CourseRating rating) {
        return courseRatingService.updateCourseRating(id, rating);
    }


    @GetMapping
    public List<CourseRating> readAllCourseRatings() {
        return courseRatingService.readAllCourseRatings();
    }

    @GetMapping("/{id}")
    public CourseRating readCourseRatingById(@PathVariable Long id) {
        return courseRatingService.readCourseRatingById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find course rating with ID " + id));

    }

    @DeleteMapping("/{id}")
    public void deleteCourseRating(@PathVariable Long id) {
        courseRatingService.deleteCourseRating(id);
    }
}
