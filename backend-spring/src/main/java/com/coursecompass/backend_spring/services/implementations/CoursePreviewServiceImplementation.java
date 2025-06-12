package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.PageDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.NUSModule;
import com.coursecompass.backend_spring.services.CoursePreviewService;
import com.coursecompass.backend_spring.services.CourseService;
import com.coursecompass.backend_spring.services.NUSModuleService;
import com.coursecompass.backend_spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.coursecompass.backend_spring.dto.NUSModsDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class CoursePreviewServiceImplementation implements CoursePreviewService {
  private final RestTemplate restTemplate = new RestTemplate();
  private final CourseService courseService;
  private final NUSModuleService moduleService;

  @Autowired
  public CoursePreviewServiceImplementation(CourseService courseService, NUSModuleService moduleService) {
    this.courseService = courseService;
    this.moduleService = moduleService;
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

  @Override
  public PageDTO<CoursePreviewDTO> getPaginatedCoursePreviews(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<NUSModule> modulePage = moduleService.getAllModules(pageable);

    List<CoursePreviewDTO> dtos = modulePage.getContent().stream()
            .map(module -> {
              Course course = courseService
                      .readCourseById(module.getModuleCode())
                      .orElse(new Course(
                              "", 0.0, 0.0, 0.0, 0, new ArrayList<>()
                      ));

              return new CoursePreviewDTO(
                      module.getModuleCode(),
                      module.getTitle(),
                      module.getModuleCredit(),
                      module.isSu(),
                      module.getSemesters(),
                      module.getFaculty(),
                      course.getAverageDifficulty(),
                      course.getAverageWorkload(),
                      course.getAverageEnjoyability(),
                      course.getRatingCount()
              );
            }).toList();

    return new PageDTO<>(
            dtos,
            modulePage.getNumber(),
            modulePage.getSize(),
            modulePage.getTotalElements(),
            modulePage.getTotalPages()
    );
  }

}
