package com.coursecompass.backend_spring.dto;

import lombok.Data;

import java.util.List;

@Data
public class NUSModsSummaryDTO {
  private String moduleCode;
  private String title;
  private List<Integer> semesters;
}
