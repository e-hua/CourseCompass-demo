package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.GoogleTokenVerifier;
import com.coursecompass.backend_spring.dto.PlanDTO;
import com.coursecompass.backend_spring.entities.Plan;
import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.repositories.PlanRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/plan")
public class PlanController {

    private final GoogleTokenVerifier googleTokenVerifier;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PlanRepository planRepository;

    @Autowired
    public PlanController(
            GoogleTokenVerifier googleTokenVerifier,
            UserRepository userRepository,
            UserService userService,
            PlanRepository planRepository) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.userRepository = userRepository;
        this.userService = userService;
        this.planRepository = planRepository;
    }

    @GetMapping("/get-plan")
    public ResponseEntity<?> getPlan(
            @RequestHeader("Authorization") String authorizationHeader
    ) {

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
            Optional<PlanDTO> plan = userService.getPlan(user);
            if (plan.isEmpty()) {
                return ResponseEntity.ok(Map.of("nodesJson", List.of(), "edgesJson", List.of()));
            }

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> result = Map.of(
                    "nodes", mapper.readValue(plan.get().getNodesJson(), List.class),
                    "edges", mapper.readValue(plan.get().getEdgesJson(), List.class)
            );
            return ResponseEntity.ok(result);


        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to verify token"));
        }
    }

    @PutMapping("/set-plan")
    public ResponseEntity<?> addPlan(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody PlanDTO planDTO
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
            Optional<Plan> existing = planRepository.findPlanByUser(user);

            if (existing.isPresent()) {
                existing.get().setNodesJson(planDTO.getNodesJson());
                existing.get().setEdgesJson(planDTO.getEdgesJson());
                planRepository.save(existing.get());
            } else {
                Plan plan = new Plan();
                plan.setUser(user);
                plan.setNodesJson(planDTO.getNodesJson());
                plan.setEdgesJson(planDTO.getEdgesJson());
                planRepository.save(plan);
            }

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to upload academic plan"));
        }
    }

    @DeleteMapping("/delete-plan")
    public ResponseEntity<?> deleteTakenCourse(
            @RequestHeader("Authorization") String authorizationHeader
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

            Optional<Plan> optionalPlan = planRepository.findPlanByUser(optionalUser.get());
            if (optionalPlan.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "Academic plan history not found"));
            }

            planRepository.delete(optionalPlan.get());

            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to delete academic plan history"));
        }
    }
}