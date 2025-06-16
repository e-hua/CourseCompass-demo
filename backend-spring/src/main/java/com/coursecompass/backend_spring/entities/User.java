package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name="Users")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private String userName;
    private Double GPA;

    // Indicating how many semesters passed since the user's entrance
    // For example Y1S2 => 2, Y2S1 => 3
    private Integer currentSemesterIndex;

    private String major;

    //For future user personalization, e.g:double degree, college, previous major, second major, minor.
    //exchange sem, noc, intern, summer school etc
    private String academicTag;

    @Column(nullable = false, unique = true)
    private String email;

    //These sub-tables are useless outside the user side
    @ElementCollection
    private List<String> bookmarkedCourseIds;
    @ElementCollection
    private List<String> plannedCourseIds;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TakenCourse> takenCourses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseRating> courseRatings;
}
