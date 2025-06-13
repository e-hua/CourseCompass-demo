package com.coursecompass.backend_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coursecompass.backend_spring.entities.NUSModule;

@Repository
public interface NUSModuleRepository extends JpaRepository<NUSModule, String> {

}
