package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.dto.CourseRatingDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.CourseRating;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.CourseRatingRepository;
import com.coursecompass.backend_spring.repositories.CourseRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.CourseRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class CourseRatingController {

    private final GoogleTokenVerifier googleTokenVerifier;
    private final CourseRatingService courseRatingService;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CourseRatingRepository courseRatingRepository;

    @Autowired
    public CourseRatingController(
            GoogleTokenVerifier googleTokenVerifier,
            CourseRatingService courseRatingService,
            UserRepository userRepository,
            CourseRepository courseRepository, CourseRatingRepository courseRatingRepository) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.courseRatingService = courseRatingService;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.courseRatingRepository = courseRatingRepository;
    }

    @PostMapping
    public ResponseEntity<?> createCourseRating(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody CourseRatingDTO rating) {

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        String idToken = authorizationHeader.substring(7);
        try {
            Map<String, Object> claims = googleTokenVerifier.verify(idToken);
            String email = (String) claims.get("email");
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            User user = optionalUser.get();
            Course course = courseRepository.findByid(rating.getCourseCode())
                    .orElseGet(() -> {
                        Course newCourse = new Course();
                        newCourse.setId(rating.getCourseCode());
                        return courseRepository.save(newCourse);
                    });

            Optional<CourseRating> existing = courseRatingRepository
                    .findByUserAndCourse(user, course);

            if (existing.isPresent()) {
                courseRatingRepository.deleteById(existing.get().getId());
            }

            CourseRating newRating = new CourseRating();
            newRating.setUser(user);
            newRating.setCourse(course);
            newRating.setCreatedAt(LocalDateTime.now());
            newRating.setCourseCode(rating.getCourseCode());
            //newRating.setCreatedAt(LocalDateTime.ofInstant(new Date().toInstant(), ZoneId.systemDefault()));
            newRating.setDifficulty(rating.getDifficulty());
            newRating.setAverageWorkload(rating.getWorkload());
            newRating.setEnjoyability(rating.getEnjoyability());

            courseRatingRepository.save(newRating);

            List<CourseRating> allRatings = courseRatingRepository.findByCourseCode(newRating.getCourseCode());
            double averageDifficulty = allRatings.stream()
                    .mapToInt(CourseRating::getDifficulty)
                    .average().orElse(0.0);

            double averageWorkload = allRatings.stream()
                    .mapToInt(CourseRating::getAverageWorkload)
                    .average().orElse(0.0);

            double averageEnjoyability = allRatings.stream()
                    .mapToInt(CourseRating::getEnjoyability)
                    .average().orElse(0.0);


            course.setAverageWorkload(averageWorkload);
            course.setAverageDifficulty(averageDifficulty);
            course.setAverageEnjoyability(averageEnjoyability);
            course.setRatingCount(allRatings.size());
            courseRepository.save(course);

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to upload course rating"));
        }
    }

    @PutMapping("/{id}")
    public CourseRating updateCourseRating(@PathVariable Long id, @RequestBody CourseRating rating) {
        return courseRatingService.updateCourseRating(id, rating);
    }


    @GetMapping
    public List<CourseRating> readAllCourseRatings() {
        return courseRatingService.readAllCourseRatings();
    }

    @GetMapping("/{id}")
    public CourseRating readCourseRatingById(@PathVariable Long id) {
        return courseRatingService.readCourseRatingById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find course rating with ID " + id));

    }

    @DeleteMapping("/{id}")
    public void deleteCourseRating(@PathVariable Long id) {
        courseRatingService.deleteCourseRating(id);
    }
}
