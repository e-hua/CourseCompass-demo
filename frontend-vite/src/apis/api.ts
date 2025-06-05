export interface TakenCourse {
  id: number;
  semesterIndex: number;
  letterGrade: string;
  units: number;
  courseCode: string;
}

const API_URL = "http://localhost:8080/api/";

export async function fetchTakenCourses(): Promise<TakenCourse[]> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "takencourses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch taken courses");

  return res.json();
}

export interface PostTakenCourseProps {
  courseCode: string;
  semesterIndex: number;
  letterGrade: string;
}

export async function addTakenCourse(
  data: PostTakenCourseProps
): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "takencourses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add taken course");
  return;
}

export async function deleteTakenCourse(id: number): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "takencourses/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete taken course");
}
