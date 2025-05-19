package com.coursecompass.backend_spring.services;
import com.coursecompass.backend_spring.entities.CourseRating;

import java.util.List;
import java.util.Optional;

public interface CourseRatingService {
    CourseRating createRating(CourseRating rating);
    Optional<CourseRating> readRatingById(Long id);
    List<CourseRating> readAllRatings();
    CourseRating updateRating(Long id, CourseRating updatedRating);
    void deleteRating(Long id);
}
