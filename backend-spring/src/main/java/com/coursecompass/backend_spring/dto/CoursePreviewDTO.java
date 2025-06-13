package com.coursecompass.backend_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CoursePreviewDTO {
  private String courseCode;
  private String courseTitle;

  private int units;
  private boolean su;
  private List<Integer> semesters;
  private String faculty;

  private double averageDifficulty;
  private double averageWorkload;
  private double averageEnjoyability;
  private int ratingCount;
}

