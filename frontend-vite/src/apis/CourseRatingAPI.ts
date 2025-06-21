import { API_URL } from "@/constants/API";

export interface CourseRating {
  id: number;
  createdAt: string;
  updatedAt: string;
  difficulty: number;
  averageWorkload: number;
  enjoyability: number;
}

export interface PostCourseRatingProps {
  courseCode: string; //not consistent, remember to change
  difficulty: number;
  workload: number;
  enjoyability: number;
}

export async function postCourseRating(
  courseCode: string,
  difficulty: number,
  workload: number,
  enjoyability: number
): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const payload = {
    courseCode,
    difficulty,
    workload,
    enjoyability,
  };

  const res = await fetch(API_URL + "ratings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to post course rating");
}
