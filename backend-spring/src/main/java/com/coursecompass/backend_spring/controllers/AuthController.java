package com.coursecompass.backend_spring.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @GetMapping("/success")
  public String success(Authentication authentication) {
    OAuth2User user = (OAuth2User) authentication.getPrincipal();
    return "Logged in as: " + user.getAttribute("email");
  }
}
