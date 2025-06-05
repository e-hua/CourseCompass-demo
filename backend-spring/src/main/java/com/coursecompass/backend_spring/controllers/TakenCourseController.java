package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.dto.TakenCourseDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.CourseRepository;
import com.coursecompass.backend_spring.repositories.TakenCourseRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/takencourses")
public class TakenCourseController {

    private final GoogleTokenVerifier googleTokenVerifier;
    private final UserRepository userRepository;
    private final UserService userService;
    private final CourseRepository courseRepository;
    private final TakenCourseRepository takenCourseRepository;

    @Autowired
    public TakenCourseController(
            GoogleTokenVerifier googleTokenVerifier,
            UserRepository userRepository,
            UserService userService,
            CourseRepository courseRepository,
            TakenCourseRepository takenCourseRepository) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.userRepository = userRepository;
        this.userService = userService;
        this.courseRepository = courseRepository;
        this.takenCourseRepository = takenCourseRepository;
    }

    @GetMapping
    public ResponseEntity<?> getTakenCourses(@RequestHeader("Authorization") String authorizationHeader) {


        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        String idToken = authorizationHeader.substring(7); // Strip "Bearer "

        try {
            Map<String, Object> claims = googleTokenVerifier.verify(idToken);
            String email = (String) claims.get("email");
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            User user = optionalUser.get();
            List<TakenCourseDTO> unrated = userService.getTakenCourses(user);
            return ResponseEntity.ok(unrated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to verify token"));
        }
    }

    @PostMapping
    public ResponseEntity<?> addTakenCourse(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody TakenCourseDTO dto
    ) {

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
            Course course = courseRepository.findByid(dto.getCourseCode())
                    .orElseGet(() -> {
                        Course newCourse = new Course();
                        newCourse.setId(dto.getCourseCode());
                        return courseRepository.save(newCourse);
                    });

            Optional<TakenCourse> existing = takenCourseRepository
                    .findByUserAndCourse(user, course);

            if (existing.isPresent()) {
                return ResponseEntity.status(409).body(Map.of("error", "Course already taken"));
            }

            TakenCourse takenCourse = new TakenCourse();
            takenCourse.setUser(user);
            takenCourse.setCourse(course);
            takenCourse.setSemesterIndex(dto.getSemesterIndex());
            takenCourse.setLetterGrade(dto.getLetterGrade());
            takenCourse.setUnits(dto.getUnits());

            takenCourseRepository.save(takenCourse);

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to add taken course"));
        }
    }

    @DeleteMapping("/{takenCourseId}")
    public ResponseEntity<?> deleteTakenCourse(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long takenCourseId
    ) {

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

            Optional<TakenCourse> optionalTakenCourse = takenCourseRepository.findById(takenCourseId);
            if (optionalTakenCourse.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "Taken course not found"));
            }

            TakenCourse takenCourse = optionalTakenCourse.get();
            takenCourseRepository.delete(takenCourse);

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to delete taken course"));
        }
    }
}
