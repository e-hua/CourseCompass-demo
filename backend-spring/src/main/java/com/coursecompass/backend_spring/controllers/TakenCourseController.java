package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.entities.TakenCourse;
import com.coursecompass.backend_spring.services.TakenCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/takencourses")
public class TakenCourseController {

    private final TakenCourseService takenCourseService;

    @Autowired
    public TakenCourseController(TakenCourseService takenCourseService) {
        this.takenCourseService = takenCourseService;
    }

    @PostMapping
    public TakenCourse createTakenCourse(@RequestBody TakenCourse takenCourse) {
        return takenCourseService.createTakenCourse(takenCourse);
    }

    @PutMapping("/{id}")
    public TakenCourse updateTakenCourse(@PathVariable Long id, @RequestBody TakenCourse takenCourse) {
        return takenCourseService.updateTakenCourse(id, takenCourse);
    }

    @GetMapping
    public List<TakenCourse> readAllTakenCourses() {
        return takenCourseService.readAllTakenCourses();
    }

    @GetMapping("/{id}")
    public TakenCourse readTakenCourseById(@PathVariable Long id) {
        return takenCourseService.readTakenCourseById(id)
                .orElseThrow(() -> new RuntimeException("Cannot find taken course with ID " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteTakenCourse(@PathVariable Long id) {
        takenCourseService.deleteTakenCourse(id);
    }
}
