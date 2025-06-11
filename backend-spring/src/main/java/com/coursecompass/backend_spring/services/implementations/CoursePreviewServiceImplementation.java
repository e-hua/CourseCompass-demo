package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.services.CoursePreviewService;
import com.coursecompass.backend_spring.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.coursecompass.backend_spring.dto.NUSModsDTO;

import java.util.ArrayList;

@Service
public class CoursePreviewServiceImplementation implements CoursePreviewService {
  private final RestTemplate restTemplate = new RestTemplate();
  private final CourseService courseService;

  @Autowired
  public CoursePreviewServiceImplementation(CourseService courseService) {
    this.courseService = courseService;
  }

  @Cacheable("nusmods")
  @Override
  public CoursePreviewDTO fetchModuleFromNUSMods(String moduleCode) {
    String url = "https://api.nusmods.com/v2/2024-2025/modules/" + moduleCode + ".json";

    NUSModsDTO nusModsDTO = restTemplate.getForObject(url, NUSModsDTO.class);
    Course course = courseService
            .readCourseById(moduleCode)
            .orElse(new Course(
                    "",
                    0.0,
                    0.0,
                    0.0,
                    0,
                    new ArrayList<>()));

    return new CoursePreviewDTO(
            nusModsDTO.getModuleCode(),
            nusModsDTO.getTitle(),
            Integer.parseInt(nusModsDTO.getModuleCredit()),
            nusModsDTO.getAttributes() != null && nusModsDTO.getAttributes().isSu(),
            nusModsDTO.getSemesterData().stream().map(x -> x.getSemester()).toList(),
            nusModsDTO.getFaculty(),
            course.getAverageDifficulty(),
            course.getAverageWorkload(),
            course.getAverageEnjoyability(),
            course.getRatingCount()
    );
  }
}
