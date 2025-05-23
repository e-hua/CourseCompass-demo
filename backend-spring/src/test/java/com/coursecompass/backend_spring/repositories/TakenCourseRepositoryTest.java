package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.TakenCourse;
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
public class TakenCourseRepositoryTest {
    @Autowired
    private TakenCourseRepository takenCourseRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindTakenCourse() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("johnny@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);
        userRepository.delete(john);
        userRepository.save(john);

        Course CS1101S = new Course();
        CS1101S.setId("CS1101S");
        // CS1101S.setRatings(new ArrayList<>());
        CS1101S.setAverageDifficulty(4.5);
        CS1101S.setAverageWorkload(5.0);
        CS1101S.setAverageEnjoyability(5.0);

        TakenCourse takenCS1101S = new TakenCourse();
        takenCS1101S.setCourse(CS1101S);

        takenCS1101S.setSemesterIndex(2);
        takenCS1101S.setLetterGrade("A+");
        takenCS1101S.setUnits(4);
        takenCS1101S.setUser(john);
        takenCourseRepository.delete(takenCS1101S);
        takenCourseRepository.save(takenCS1101S);

        Optional<TakenCourse> maybeTakenCS1101S = takenCourseRepository.findById(takenCS1101S.getId());

        assertTrue(maybeTakenCS1101S.isPresent());
        assertEquals("CS1101S", maybeTakenCS1101S.get().getCourse().getId());
        assertEquals("A+", maybeTakenCS1101S.get().getLetterGrade());


    }
}
