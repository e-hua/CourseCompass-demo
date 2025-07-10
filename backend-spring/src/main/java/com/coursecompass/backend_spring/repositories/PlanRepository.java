package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.Plan;
import com.coursecompass.backend_spring.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<Plan> findPlanByUser(User user);
}
