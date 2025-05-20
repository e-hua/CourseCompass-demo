package com.coursecompass.backend_spring;

import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.CourseRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendSpringApplication {
	// Add this in a @Configuration or @SpringBootApplication class

	@Bean
	CommandLineRunner runner(UserRepository userRepo, CourseRepository courseRepo) {
		return args -> {
			Course cs1101s = new Course("CS1101S", 4.0, 4.5, 4.2, new ArrayList<>());
			courseRepo.save(cs1101s);

			User user = new User();
			user.setUserName("guanhua");
			user.setEmail("guanhua@example.com");
			user.setCurrentSemesterIndex(2);
			user.setGPA(4.8);
			user.setBookmarkedCourseIds(List.of("CS1101S"));
			user.setPlannedCourseIds(List.of("CS1231S"));

			userRepo.save(user);
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(BackendSpringApplication.class, args);
	}

}
