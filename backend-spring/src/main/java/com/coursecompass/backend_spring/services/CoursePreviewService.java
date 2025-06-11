package com.coursecompass.backend_spring.services;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.NUSModsDTO;

public interface CoursePreviewService {
   CoursePreviewDTO fetchModuleFromNUSMods(String moduleCode);
}
