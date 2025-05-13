package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.models.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserProfileController {

    @GetMapping("/user-profile")
    public UserProfile getUserProfile() {
        UserProfile user = new UserProfile();
        user.setName("Chen Guanhua");
        user.setMajor("Computer Science");
        user.setGpa(5.0);
        user.setInterests(List.of("Software Engineering", "Machine Learning"));

        user.setRoadmap(List.of(
                new SemesterCourses(
                        "Year 1, Sem 1",
                        List.of(
                                new Course("CS1101S", "Programming Methodology"),
                                new Course("MA1522", "Linear Algebra for Computing"),
                                new Course("MA1521", "Calculus for Computing"),
                                new Course("CS1231S", "Discrete Structures")
                        )
                ),
                new SemesterCourses(
                        "Year 1, Sem 2",
                        List.of(
                                new Course("CS2030S", "Programming Methodology II"),
                                new Course("CS2040S", "Data Structures and Algorithms"),
                                new Course("CS2100", "Computer Organisation")
                        )
                )
        ));

        user.setBookmarkedModules(List.of(
                new Course("CS2103T", "Software Engineering")
        ));

        user.setCompletedCourses(List.of(
                new CompletedCourse("CS1101S", "Programming Methodology", 4, 3)
        ));

        return user;
    }
}
