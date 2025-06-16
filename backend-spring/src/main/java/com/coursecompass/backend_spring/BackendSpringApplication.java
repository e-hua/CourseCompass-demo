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

		};
	}


	public static void main(String[] args) {
		SpringApplication.run(BackendSpringApplication.class, args);
		System.out.println("Hello, World !");
	}

}
