package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.coursecompass.backend_spring.dto.TakenCourseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final GoogleTokenVerifier googleTokenVerifier;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(GoogleTokenVerifier googleTokenVerifier, UserRepository userRepository, UserService userService) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.userRepository = userRepository;
      this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(
            @RequestBody Map<String, Object> payload,
            @RequestHeader("Authorization") String authorizationHeader) {

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
            user.setUserName((String)payload.getOrDefault("userName", user.getUserName()));

            Object semesterObj = payload.get("currentSemesterIndex");
            if (semesterObj != null) {
                int semester = Integer.parseInt(semesterObj.toString());
                user.setCurrentSemesterIndex(semester);
            }

            if (payload.containsKey("bookmarkedCourseIds")) {
                Object rawBookmarked = payload.get("bookmarkedCourseIds");

                ObjectMapper objectMapper = new ObjectMapper();
                List<String> bookmarks = objectMapper.convertValue(
                        rawBookmarked,
                        new TypeReference<List<String>>() {}
                );

                user.setBookmarkedCourseIds(bookmarks);
            }

            userService.updateUser(user.getId(), user);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(Map.of("error", "Backend is busy, please try again later"));
        }
    }

    @GetMapping("/taken-courses")
    public ResponseEntity<?> getTakenCourses(@RequestHeader("Authorization") String authorizationHeader) {

       System.out.println("Authorization header: " + authorizationHeader);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        String idToken = authorizationHeader.substring(7); // Strip "Bearer "

        try {
            System.out.println("Token: " + idToken);
            Map<String, Object> claims = googleTokenVerifier.verify(idToken);
            String email = (String) claims.get("email");
            System.out.println(" Email from token: " + claims.get("email"));
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

}
