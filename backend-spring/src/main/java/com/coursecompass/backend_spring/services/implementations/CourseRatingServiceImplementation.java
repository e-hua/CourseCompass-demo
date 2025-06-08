package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.repositories.CourseRatingRepository;
import com.coursecompass.backend_spring.services.CourseRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseRatingServiceImplementation implements CourseRatingService {
    private final CourseRatingRepository ratingRepository;

    @Autowired
    public CourseRatingServiceImplementation(CourseRatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public CourseRating createCourseRating(CourseRating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    public Optional<CourseRating> readCourseRatingById(Long id) {
        return ratingRepository.findById(id);
    }

    @Override
    public List<CourseRating> readAllCourseRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public CourseRating updateCourseRating(Long id, CourseRating updatedRating) {
        return ratingRepository.findById(id)
                .map(existingRating -> {
                    existingRating.setUpdatedAt(updatedRating.getUpdatedAt());
                    //existingRating.setCourse(updatedRating.getCourse());
                    //existingRating.setUser(updatedRating.getUser());
                    existingRating.setDifficulty(updatedRating.getDifficulty());
                    existingRating.setAverageWorkload(updatedRating.getAverageWorkload());
                    existingRating.setEnjoyability(updatedRating.getEnjoyability());
                    //existingRating.setCreatedAt(updatedRating.getCreatedAt());
                    return ratingRepository.save(existingRating);
                })
                .orElseThrow(() -> new RuntimeException("Rating not found with id " + id));
    }

    @Override
    public void deleteCourseRating(Long id) {
        ratingRepository.deleteById(id);
    }
}
