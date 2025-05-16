package com.coursecompass.backend_spring.entities;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.*;

@Data
@Entity
@Table(name="TakenCourses")
public class TakenCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer semesterIndex;
    private String letterGrade;
    private int units;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
