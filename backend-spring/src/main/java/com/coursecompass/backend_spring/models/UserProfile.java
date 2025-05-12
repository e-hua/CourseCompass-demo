package com.coursecompass.backend_spring.models;

import java.util.List;

public class UserProfile {
    private String name;
    private String major;
    private double gpa;
    private List<String> interests;
    private List<SemesterCourses> roadmap;
    private List<Course> bookmarkedModules;
    private List<CompletedCourse> completedCourses;

    // Getters and Setters
    // Constructors (default + all-args)

    public UserProfile() {

    }

    public UserProfile(String name,
                       String major,
                       double gpa,
                       List<String> interests,
                       List<SemesterCourses> roadmap,
                       List<Course> bookmarkedModules,
                       List<CompletedCourse> completedCourses) {
        this.name = name;
        this.major = major;
        this.gpa = gpa;
        this.interests = interests;
        this.roadmap = roadmap;
        this.bookmarkedModules = bookmarkedModules;
        this.completedCourses = completedCourses;
    }

    public String getName() {
        return name;
    }

    public String getMajor() {
        return major;
    }

    public double getGpa() {
        return gpa;
    }

    public List<String> getInterests() {
        return interests;
    }

    public List<SemesterCourses> getRoadmap() {
        return roadmap;
    }

    public List<Course> getBookmarkedModules() {
        return bookmarkedModules;
    }

    public List<CompletedCourse> getCompletedCourses() {
        return completedCourses;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    public void setRoadmap(List<SemesterCourses> roadmap) {
        this.roadmap = roadmap;
    }

    public void setBookmarkedModules(List<Course> bookmarkedModules) {
        this.bookmarkedModules = bookmarkedModules;
    }

    public void setCompletedCourses(List<CompletedCourse> completedCourses) {
        this.completedCourses = completedCourses;
    }
}