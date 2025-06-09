package com.coursecompass.backend_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseRatingDTO {
  String courseCode;
  int difficulty;
  int workload;
  int enjoyability;
}
