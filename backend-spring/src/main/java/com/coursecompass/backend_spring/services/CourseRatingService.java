package com.coursecompass.backend_spring.services;
import com.coursecompass.backend_spring.entities.CourseRating;

import java.util.List;
import java.util.Optional;

public interface CourseRatingService {
    CourseRating createCourseRating(CourseRating rating);
    Optional<CourseRating> readCourseRatingById(Long id);
    List<CourseRating> readAllCourseRatings();
    CourseRating updateCourseRating(Long id, CourseRating updatedRating);
    void deleteCourseRating(Long id);
}
