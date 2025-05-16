package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

}
