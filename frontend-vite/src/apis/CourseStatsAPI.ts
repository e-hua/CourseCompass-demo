import { API_URL } from "@/constants/API";

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
