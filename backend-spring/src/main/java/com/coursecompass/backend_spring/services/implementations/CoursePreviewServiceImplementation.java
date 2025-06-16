package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.CoursePreviewFilter;
import com.coursecompass.backend_spring.dto.PageDTO;
import com.coursecompass.backend_spring.entities.Course;
import com.coursecompass.backend_spring.entities.NUSModule;
import com.coursecompass.backend_spring.services.CoursePreviewService;
import com.coursecompass.backend_spring.services.CourseService;
import com.coursecompass.backend_spring.services.NUSModuleService;
import com.coursecompass.backend_spring.services.UserService;
import com.coursecompass.backend_spring.specifications.NUSModuleSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.coursecompass.backend_spring.dto.NUSModsDTO;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

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
  public PageDTO<CoursePreviewDTO> getPaginatedCoursePreviews(int page, int size, CoursePreviewFilter filter) {
    Specification<NUSModule> specification = NUSModuleSpecification.build(filter, new HashSet<>());

    // Fetch modules page by page, only need to fetch once per page
    Pageable pageable = PageRequest.of(page, size);
    Page<NUSModule> modulePage = moduleService.findAll(specification, pageable);
    List<NUSModule> modules = modulePage.getContent();

    Set<String> moduleCodes = modules.stream()
            .map(NUSModule::getModuleCode)
            .collect(Collectors.toSet());

    Map<String, Course> courseMap = courseService.readCourseById(moduleCodes).stream()
            .collect(Collectors.toMap(Course::getId, Function.identity()));

    List<CoursePreviewDTO> dtos = modules.stream()
            .map(module -> {
              Course course = courseMap.get(module.getModuleCode());
              if (course != null) {
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
              } else {
                return new CoursePreviewDTO(
                        module.getModuleCode(),
                        module.getTitle(),
                        module.getModuleCredit(),
                        module.isSu(),
                        module.getSemesters(),
                        module.getFaculty(),
                        0.0, 0.0, 0.0, 0
                );
              }
            })
            .toList();

    return new PageDTO<>(dtos, page, size, (int) modulePage.getTotalElements(), modulePage.getTotalPages());
  }

  @Override
  public PageDTO<CoursePreviewDTO> getPaginatedRatedCoursePreviews(int page, int size, CoursePreviewFilter filter) {
    List<Course> ratedCourses = courseService.readAllCourses();

    // Using enhanced Switch statement
    Comparator<Course> comparator = switch (filter.getSortBy()) {
      case "averageDifficulty" -> Comparator.comparing(Course::getAverageDifficulty, Comparator.nullsLast(Double::compare));
      case "averageWorkload" -> Comparator.comparing(Course::getAverageWorkload, Comparator.nullsLast(Double::compare));
      case "averageEnjoyability" -> Comparator.comparing(Course::getAverageEnjoyability, Comparator.nullsLast(Double::compare));
      case "ratingCount" -> Comparator.comparing(Course::getRatingCount, Comparator.nullsLast(Integer::compare));
      default -> null;
    };

    if (comparator != null) {
      if (filter.getDescending()) {
        comparator = comparator.reversed();
      }
      ratedCourses.sort(comparator);
    }
    List<String> sortedCourseIds = ratedCourses.stream().map(Course::getId).toList();

    Specification<NUSModule> specification = NUSModuleSpecification.build(filter, new HashSet<>(sortedCourseIds));

    Pageable pageable = PageRequest.of(page, size);
    Page<NUSModule> modulePage = moduleService.findAll(specification, pageable);
    List<NUSModule> modules = modulePage.getContent();

    Set<String> moduleCodes = modules.stream()
            .map(NUSModule::getModuleCode)
            .collect(Collectors.toSet());

    Map<String, NUSModule> moduleMap = modulePage.getContent().stream()
            .collect(Collectors.toMap(NUSModule::getModuleCode, Function.identity()));

    List<String> sortedIdsInPage = sortedCourseIds.stream()
            .filter(moduleMap::containsKey)
            .toList();

    List<NUSModule> reorderedModules = sortedIdsInPage.stream()
            .map(moduleMap::get)
            .toList();

    List<CoursePreviewDTO> dtos = reorderedModules.stream()
            .map(module -> {
              Course course = courseService.readCourseById(module.getModuleCode()).get();
              return new CoursePreviewDTO(
                      module.getModuleCode(),
                      module.getTitle(),
                      module.getModuleCredit(),
                      module.isSu(),
                      module.getSemesters(),
                      module.getFaculty(),
                      Optional.ofNullable(course.getAverageDifficulty()).orElse(0.0),
                      Optional.ofNullable(course.getAverageWorkload()).orElse(0.0),
                      Optional.ofNullable(course.getAverageEnjoyability()).orElse(0.0),
                      Optional.ofNullable(course.getRatingCount()).orElse(0)
              );
            })
            .toList();

    return new PageDTO<>(dtos, page, size, modulePage.getTotalElements(), modulePage.getTotalPages());
  }
}
