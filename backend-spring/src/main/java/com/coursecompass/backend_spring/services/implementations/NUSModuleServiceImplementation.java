package com.coursecompass.backend_spring.services.implementations;

import com.coursecompass.backend_spring.repositories.NUSModuleRepository;
import com.coursecompass.backend_spring.services.NUSModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.coursecompass.backend_spring.entities.NUSModule;

@Service
public class NUSModuleServiceImplementation implements NUSModuleService {

  private final NUSModuleRepository NUSModuleRepository;

  @Autowired
  public NUSModuleServiceImplementation(NUSModuleRepository NUSModuleRepository) {
    this.NUSModuleRepository = NUSModuleRepository;
  }

  @Override
  public Page<NUSModule> getAllModules(Pageable pageable) {
    return NUSModuleRepository.findAll(pageable);
  }

  @Override
  public Page<NUSModule> findAll(Specification<NUSModule> specification, Pageable pageable) {
    return NUSModuleRepository.findAll(specification, pageable);
  }

}