const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://coursecompass-demo.onrender.com/api/";

export type CourseStats = {
  id: string;
  averageDifficulty: number;
  averageWorkload: number;
  averageEnjoyability: number;
  ratingCount: number;
};

export async function fetchCourseStats(courseId: string) {
  const res = await fetch(API_URL + "courses/" + courseId);

  if (!res.ok) {
    throw new Error("Failed to fetch course " + courseId);
  }

  return res.json();
}
