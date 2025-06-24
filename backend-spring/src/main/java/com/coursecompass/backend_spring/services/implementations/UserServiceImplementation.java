package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.dto.PlanDTO;
import com.coursecompass.backend_spring.entities.*;
import com.coursecompass.backend_spring.repositories.PlanRepository;
import com.coursecompass.backend_spring.repositories.TakenCourseRepository;
import com.coursecompass.backend_spring.repositories.UserRepository;
import com.coursecompass.backend_spring.services.UserService;
import com.coursecompass.backend_spring.dto.TakenCourseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;
    private final TakenCourseRepository takenCourseRepository;
    private final PlanRepository planRepository;

    @Autowired
    public UserServiceImplementation(
            UserRepository userRepository,
            TakenCourseRepository takenCourseRepository,
            PlanRepository planRepository) {
        this.userRepository = userRepository;
        this.takenCourseRepository = takenCourseRepository;
        this.planRepository = planRepository;
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
                    existingUser.setCourseRatings(updatedUser.getCourseRatings());
                    existingUser.setCreatedAt(existingUser.getCreatedAt());
                    existingUser.setUpdatedAt(updatedUser.getUpdatedAt());
                    existingUser.setTakenCourses(updatedUser.getTakenCourses());
                    existingUser.setUserName(updatedUser.getUserName());
                    existingUser.setGPA(updatedUser.getGPA());
                    existingUser.setCurrentSemesterIndex(updatedUser.getCurrentSemesterIndex());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setBookmarkedCourseIds(updatedUser.getBookmarkedCourseIds());
                    existingUser.setPlannedCourseIds(updatedUser.getPlannedCourseIds());
                    existingUser.setMajor(updatedUser.getMajor());

                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("Cannot find user with ID " + id));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<TakenCourseDTO> getTakenCourses(User user){
        List<TakenCourse> courseList = takenCourseRepository.findByUser(user);

        return courseList.stream()
                .map(tc -> new TakenCourseDTO(
                        tc.getId(),
                        tc.getSemesterIndex(),
                        tc.getLetterGrade(),
                        tc.getUnits(),
                        tc.getCourse().getId()
                ))
                .toList();
    }

    @Override
    public Optional<PlanDTO> getPlan(User user) {
        return planRepository.findPlanByUser(user).map(plan -> new PlanDTO(
                plan.getNodesJson(), plan.getEdgesJson()
        ));
    }
}
