package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
public class CourseRepositoryTest {

    @Autowired
    private CourseRepository courseRepository;

    @Test
    public void testSaveAndFindCourse() {
        Course CS1101S = new Course();
        CS1101S.setId("CS1101S");
        // CS1101S.setRatings(new ArrayList<>());
        CS1101S.setAverageDifficulty(4.5);
        CS1101S.setAverageWorkload(5.0);
        CS1101S.setAverageEnjoyability(5.0);
        courseRepository.save(CS1101S);

        Optional<Course> maybeCS1101S = courseRepository.findById(CS1101S.getId());

        assertTrue(maybeCS1101S.isPresent());
        assertEquals("CS1101S", maybeCS1101S.get().getId());
        courseRepository.deleteById(CS1101S.getId());
    }
}
