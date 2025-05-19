package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.entities.*;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> readUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> readAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUserName(updatedUser.getUserName());
                    existingUser.setGPA(updatedUser.getGPA());
                    existingUser.setCurrentSemesterIndex(updatedUser.getCurrentSemesterIndex());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setBookmarkedCourseIds(updatedUser.getBookmarkedCourseIds());
                    existingUser.setPlannedCourseIds(updatedUser.getPlannedCourseIds());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("Cannot find user with ID " + id));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
