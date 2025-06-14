 //const API_URL = "http://localhost:8080/api/";
const API_URL = "https://coursecompass-demo.onrender.com/api/";

export async function loginWithIdToken(idToken: string) {
  const res = await fetch(API_URL + "auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) throw new Error("Backend verification failed");

  return res.json();
}
