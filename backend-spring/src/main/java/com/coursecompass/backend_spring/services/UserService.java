package com.coursecompass.backend_spring.services;
import com.coursecompass.backend_spring.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> readUserById(Long id);
    List<User> readAllUsers();
    User updateUser(Long id, User updatedUser);
    void deleteUser(Long id);
}
