package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.repositories.TakenCourseRepository;
import com.coursecompass.backend_spring.services.TakenCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TakenCourseServiceImplementation implements TakenCourseService {
    private final TakenCourseRepository takenCourseRepository;

    @Autowired
    public TakenCourseServiceImplementation(TakenCourseRepository takenCourseRepository) {
        this.takenCourseRepository = takenCourseRepository;
    }

    @Override
    public TakenCourse createTakenCourse(TakenCourse course) {
        return takenCourseRepository.save(course);
    }

    @Override
    public Optional<TakenCourse> readTakenCourseById(Long id) {
        return takenCourseRepository.findById(id);
    }

    @Override
    public List<TakenCourse> readAllTakenCourses() {
        return takenCourseRepository.findAll();
    }

    @Override
    public TakenCourse updateTakenCourse(Long id, TakenCourse updatedCourse) {
        return takenCourseRepository.findById(id)
                .map(existingCourse -> {
                    existingCourse.setCourse(updatedCourse.getCourse());
                    existingCourse.setUser(updatedCourse.getUser());
                    existingCourse.setUnits(updatedCourse.getUnits());
                    existingCourse.setSemesterIndex(updatedCourse.getSemesterIndex());
                    existingCourse.setLetterGrade(updatedCourse.getLetterGrade());
                    return takenCourseRepository.save(existingCourse);
                })
                .orElseThrow(() -> new RuntimeException("Cannot find takenCourse with id " + id));
    }

    @Override
    public void deleteTakenCourse(Long id) {
        takenCourseRepository.deleteById(id);
    }
}
