package com.coursecompass.backend_spring;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.CourseRatingRepository;
import com.coursecompass.backend_spring.repositories.CourseRepository;
import com.coursecompass.backend_spring.repositories.TakenCourseRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendSpringApplication {

	@Bean
	CommandLineRunner runner(UserRepository userRepo, CourseRepository courseRepo, TakenCourseRepository takenCourseRepo) {

		System.out.println(" Current users in DB after save:");
		userRepo.findAll().forEach(u -> System.out.println(u.getEmail()));

		return args -> {

			User john = new User();
			john.setUserName("Hua");
			john.setEmail("eclipsehua@gmail.com");
			john.setGPA(5.0);
			john.setCurrentSemesterIndex(2);
			john.setBookmarkedCourseIds(List.of("CS1101S"));
			john.setPlannedCourseIds(List.of("CS2103T"));
			userRepo.deleteAll();
			userRepo.save(john);


			Course CS1101S = new Course();
			CS1101S.setId("CS1101S");
			CS1101S.setRatings(new ArrayList<>());
			CS1101S.setAverageDifficulty(0.0);
			CS1101S.setAverageWorkload(0.0);
			CS1101S.setAverageEnjoyability(0.0);
			CS1101S.setRatingCount(0);
			courseRepo.save(CS1101S);

			TakenCourse takenCS1101S = new TakenCourse();
			takenCS1101S.setCourse(CS1101S);

			takenCS1101S.setSemesterIndex(2);
			takenCS1101S.setLetterGrade("A+");
			takenCS1101S.setUnits(4);
			takenCS1101S.setUser(john);
			takenCourseRepo.deleteAll();
			takenCourseRepo.save(takenCS1101S);
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(BackendSpringApplication.class, args);
		System.out.println("Hello, World !");
	}

}
