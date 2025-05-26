import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function GoogleLogin() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  function storeUserInfo(userInfo: {
    name: string;
    email: string;
    avatar: string;
  }) {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }

  function handleToken(idToken: string) {
    const jwtPayload = JSON.parse(atob(idToken.split(".")[1]));
    const userInfo = {
      name: jwtPayload.name,
      email: jwtPayload.email,
      avatar: jwtPayload.picture,
    };

    setUser(userInfo);
    storeUserInfo(userInfo);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Check if the URL has a hash fragment
    const hash = window.location.hash;
    if (hash) {
      // Parse the string without "#"
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get("id_token");
      const storedNonce = localStorage.getItem("google_nonce");

      if (idToken && storedNonce) {
        const jwtPayload = JSON.parse(atob(idToken.split(".")[1]));
        const nonce = jwtPayload.nonce;

        if (nonce === storedNonce) {
          handleToken(idToken);
        } else {
          console.error("Nonce mismatch, possible replay attack!");
        }

        // Clean up nonce after successful verification
        localStorage.removeItem("google_nonce");
      }
    }
  }, []);

  function handleLogin() {
    const nonce = Math.random().toString(36).substring(2, 7);
    localStorage.setItem("google_nonce", nonce);

    // Reset the url
    const oauthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}&` +
      `response_type=id_token&` +
      `scope=openid profile email&` +
      `state=state_parameter_passthrough_value&` +
      `nonce=${nonce}`;

    window.location.href = oauthUrl;
  }

  return (
    <div>
      {!user && (
        <Button onClick={() => handleLogin()}>Login with Google</Button>
      )}
      {user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <img src={user.avatar} alt="User Avatar" />
        </div>
      )}
    </div>
  );
}
