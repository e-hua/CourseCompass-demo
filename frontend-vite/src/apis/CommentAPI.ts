import { API_URL } from "@/constants/API";

export interface CommentCreateDTO {
  takenCourseId: number;
  content: string;
}

export interface CommentReadDTO {
  id: number;
  content: string;
  authorEmail: string;
  authorUsername: string;
  courseCode: string;
  letterGrade: string;
  difficulty: number;
  averageWorkload: number;
  enjoyability: number;
  createdAt: string;
  updatedAt: string;
}

export async function createComment(data: CommentCreateDTO): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to create comment: " + message);
  }
}

export async function deleteComment(data: CommentCreateDTO): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "comments", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to delete comment: " + message);
  }
}

export async function updateComment(data: CommentCreateDTO): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "comments", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to update comment: " + message);
  }
}

export async function readComments(
  courseCode: string
): Promise<CommentReadDTO[]> {
  const res = await fetch(API_URL + `comments/${courseCode}`, {
    method: "GET",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to fetch comment reply: " + message);
  }

  return res.json();
}
