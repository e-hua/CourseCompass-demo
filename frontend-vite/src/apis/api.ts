export interface TakenCourse {
  id: number;
  semesterIndex: number;
  letterGrade: string;
  courseName: string;
  courseCode: string;
  rating?: number;
}

const API_URL = "http://localhost:8080/api/";

export async function fetchTakenCourses(): Promise<TakenCourse[]> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "user/taken-courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch taken courses");

  return res.json();
}
