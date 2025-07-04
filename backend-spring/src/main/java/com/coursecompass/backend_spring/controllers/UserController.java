package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    public UserController(
            GoogleTokenVerifier googleTokenVerifier,
            UserRepository userRepository,
            UserService userService) {
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

            user.setMajor((String)payload.getOrDefault("major", user.getMajor()));

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

}
