package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="Courses")
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    // E.g. "CS1231S"
    private String id;

    private Double averageDifficulty;
    private Double averageWorkload;
    private Double averageEnjoyability;
    private Integer ratingCount;

    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseRating> ratings;

}
