package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final GoogleTokenVerifier googleTokenVerifier;
  private final UserRepository userRepository;

  public AuthController(GoogleTokenVerifier googleTokenVerifier, UserRepository userRepository) {
    this.googleTokenVerifier = googleTokenVerifier;
    this.userRepository = userRepository;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
    try {
      String idToken = payload.get("idToken");
      Map<String, Object> claims = googleTokenVerifier.verify(idToken);

      String email = (String) claims.get("email");
      String name = (String) claims.get("name");

      Optional<User> maybeUser = userRepository.findByEmail(email);

      User user = maybeUser.orElseGet(
              () -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUserName(name);
                return newUser;
              }
      );

      userRepository.save(user);

      return ResponseEntity.ok(user);
    } catch (Exception e) {
      System.out.println(e);
      return ResponseEntity.badRequest().body(Map.of("error", "Invalid token"));
    }
  }
}
