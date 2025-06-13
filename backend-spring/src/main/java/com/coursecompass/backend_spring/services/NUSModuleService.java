package com.coursecompass.backend_spring.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.coursecompass.backend_spring.entities.NUSModule;

public interface NUSModuleService {
  Page<NUSModule> getAllModules(Pageable pageable);
}
