package com.coursecompass.backend_spring.models;

public class CompletedCourse extends Course {
    private int difficultyRating;
    private int workloadRating;

    public CompletedCourse(String code, String name, int difficultyRating, int workloadRating) {
        super(code, name);
        this.difficultyRating = difficultyRating;
        this.workloadRating = workloadRating;
    }

    public int getDifficultyRating() {
        return difficultyRating;
    }

    public void setDifficultyRating(int difficultyRating) {
        this.difficultyRating = difficultyRating;
    }

    public int getWorkloadRating() {
        return workloadRating;
    }

    public void setWorkloadRating(int workloadRating) {
        this.workloadRating = workloadRating;
    }
}
