package com.coursecompass.backend_spring.services;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.NUSModsDTO;
import com.coursecompass.backend_spring.dto.PageDTO;

public interface CoursePreviewService {
   CoursePreviewDTO fetchModuleFromNUSMods(String moduleCode);
   PageDTO<CoursePreviewDTO> getPaginatedCoursePreviews(int page, int size);
}
