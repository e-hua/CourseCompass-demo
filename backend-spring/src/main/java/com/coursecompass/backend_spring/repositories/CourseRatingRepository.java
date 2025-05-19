package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.CourseRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {

}
