// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://coursecompass-demo.onrender.com/api/";

export interface UpdateUserPayload {
  userName: string;
  currentSemesterIndex: number;
  bookmarkedCourseIds?: string[];
  major: string;
}

export async function updateUserProfile(
  payload: UpdateUserPayload,
  idToken: string
) {
  const res = await fetch(API_URL + "user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(payload),
  });

  return res;
}
