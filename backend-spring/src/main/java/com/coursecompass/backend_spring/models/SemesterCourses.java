package com.coursecompass.backend_spring.models;

import java.util.List;

public class SemesterCourses {
    private String semester;
    private List<Course> courses;

    public SemesterCourses(String semester, List<Course> courses) {
        this.semester = semester;
        this.courses = courses;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
