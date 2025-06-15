package com.coursecompass.backend_spring.dto;

import lombok.Data;

import java.util.List;

@Data
public class CoursePreviewFilter {
  private String search;
  private String faculty;
  private List<Integer> semesters;
  private Boolean su;
  // Difficulty, Enjoyability, Workload
  private String sortBy;
  private Boolean descending;
}
