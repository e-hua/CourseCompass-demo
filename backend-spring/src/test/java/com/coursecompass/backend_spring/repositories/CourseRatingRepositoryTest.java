package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class CourseRatingRepositoryTest {
    @Autowired
    private CourseRatingRepository courseRatingRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindCourseRating() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("John@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);
        userRepository.save(john);

        Course CS1101S = new Course();
        CS1101S.setId("CS1101S");
        CS1101S.setAverageDifficulty(4.5);
        CS1101S.setAverageWorkload(5.0);
        CS1101S.setAverageEnjoyability(5.0);
        courseRepository.save(CS1101S);

        CourseRating ratingFromJohn = new CourseRating();
        ratingFromJohn.setCourse(CS1101S);
        ratingFromJohn.setUser(john);

        courseRatingRepository.save(ratingFromJohn);

        Optional<CourseRating> maybeRatingFromJohn = courseRatingRepository.findById(ratingFromJohn.getId());

        assertTrue(maybeRatingFromJohn.isPresent());
        assertEquals(john, maybeRatingFromJohn.get().getUser());
        assertEquals(CS1101S, maybeRatingFromJohn.get().getCourse());

    }
}
