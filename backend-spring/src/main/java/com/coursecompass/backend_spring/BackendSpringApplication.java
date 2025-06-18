package com.coursecompass.backend_spring;

import com.coursecompass.backend_spring.dto.CommentCreateDTO;
import com.coursecompass.backend_spring.dto.CommentReadDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.services.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class BackendSpringApplication {

	@Bean
	CommandLineRunner runner(
					UserService userService,
					DummyDataService dummyDataService
	) {

		System.out.println("Current users in DB after save:");
		userService.readAllUsers().forEach(u -> System.out.println(u.getEmail()));

		return args -> {
			dummyDataService.insertDummyComment();
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(BackendSpringApplication.class, args);
		System.out.println("Hello, World !");
	}

}
