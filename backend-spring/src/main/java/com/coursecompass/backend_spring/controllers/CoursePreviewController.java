package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.CoursePreviewFilter;
import com.coursecompass.backend_spring.dto.PageDTO;
import com.coursecompass.backend_spring.services.CoursePreviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coursePreviews")
public class CoursePreviewController {

  private final CoursePreviewService coursePreviewService;

  @Autowired
  public CoursePreviewController(CoursePreviewService coursePreviewService) {
    this.coursePreviewService = coursePreviewService;
  }

  @GetMapping("/{courseCode}")
  public ResponseEntity<CoursePreviewDTO> getCoursePreview(@PathVariable String courseCode) {
    CoursePreviewDTO coursePreviewDTO = coursePreviewService.fetchModuleFromNUSMods(courseCode);
    return ResponseEntity.ok(coursePreviewDTO);
  }

  @GetMapping
  public ResponseEntity<PageDTO<CoursePreviewDTO>> getAllCoursePreviews(
          @ModelAttribute CoursePreviewFilter filter,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "20") int size
  ) {
    PageDTO<CoursePreviewDTO> result =
            coursePreviewService.getPaginatedCoursePreviews(page, size, filter);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/previews/rated")
  public ResponseEntity<PageDTO<CoursePreviewDTO>> getRatedCoursePreviews(
          CoursePreviewFilter filter,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "20") int size
  ) {
    PageDTO<CoursePreviewDTO> result = coursePreviewService.getPaginatedRatedCoursePreviews(page, size, filter);
    return ResponseEntity.ok(result);
  }
}
