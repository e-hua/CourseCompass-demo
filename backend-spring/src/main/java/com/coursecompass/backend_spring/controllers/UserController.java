package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.entities.User;
import com.coursecompass.backend_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @GetMapping
    public List<User> readAllUsers() {
        return userService.readAllUsers();
    }

    @GetMapping("/{id}")
    public User readUserById(@PathVariable Long id) {
        return userService
                .readUserById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find user with ID " + id));

    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
