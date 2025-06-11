package com.coursecompass.backend_spring.controllers;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.services.CoursePreviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
