const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://coursecompass-demo.onrender.com/api/";

export interface CommentReplyCreateDTO {
  commentId: number;
  content: string;
}

export interface CommentReplyReadDTO {
  id: number;
  content: string;
  authorEmail: string;
  authorUsername: string;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export async function createCommentReply(
  data: CommentReplyCreateDTO
): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "commentReplies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to create comment reply: " + message);
  }
}

export async function deleteCommentReply(
  data: CommentReplyCreateDTO
): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "commentReplies", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to delete comment reply: " + message);
  }
}

export async function updateCommentReply(
  data: CommentReplyCreateDTO
): Promise<void> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "commentReplies", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to update comment reply: " + message);
  }
}

export async function readCommentReplies(
  commentId: number
): Promise<CommentReplyReadDTO[]> {
  const res = await fetch(API_URL + `commentReplies/${commentId}`, {
    method: "GET",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error("Failed to fetch comment replies: " + message);
  }

  return res.json();
}
