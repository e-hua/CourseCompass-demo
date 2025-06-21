import { API_URL } from "@/constants/API";

export async function loginWithIdToken(idToken: string) {
  const res = await fetch(API_URL + "auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) throw new Error("Backend verification failed");

  return res.json();
}
