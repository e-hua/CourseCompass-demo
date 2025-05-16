package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;

@Data
@Entity
@Table(name="Courses")
public class Course {
    @Id
    // E.g. "CS1231S"
    private String id;

    private Double averageDifficulty;
    private Double averageWorkload;
    private Double averageEnjoyability;

    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseRating> ratings;
}
