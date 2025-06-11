package com.coursecompass.backend_spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NUSModsDTO {
  private String moduleCode;
  private String title;
  private String moduleCredit;
  private Attributes attributes;
  private List<SemesterData> semesterData;
  private String faculty;

  /*
  private String acadYear;
  private String preclusion;
  private String description;
  private String department;
  private String prerequisite;
  private List<String> fulfillRequirements;
   */

  @Data
  public static class Attributes {
    @JsonProperty(defaultValue = "false")
    private boolean su;

    @JsonProperty(defaultValue = "false")
    private boolean mpes1;

    @JsonProperty(defaultValue = "false")
    private boolean mpes2;
  }

  @Data
  public static class SemesterData {
    private int semester;
    private String examDate;
    private int examDuration;
  }
}
