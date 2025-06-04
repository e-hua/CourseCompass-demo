package com.coursecompass.backend_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TakenCourseDTO {
    private Long id;
    private int semesterIndex;
    private String letterGrade;
    private int units;
    private String courseCode;
}

