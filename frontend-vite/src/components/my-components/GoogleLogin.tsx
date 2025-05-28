import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, LogIn, LogOut } from "lucide-react";
import { useUserProfile } from "@/components/my-contexts/UserProfileContext";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function GoogleLogin() {
  const [userAuthInfo, setUserAuthInfo] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);
  const { setUserProfile } = useUserProfile();

  function storeUserAuthInfo(userAuthInfo: {
    name: string;
    email: string;
    avatar: string;
  }) {
    localStorage.setItem("userAuthInfo", JSON.stringify(userAuthInfo));
  }

  function handleToken(idToken: string) {
    const jwtPayload = JSON.parse(atob(idToken.split(".")[1]));
    const userInfo = {
      name: jwtPayload.name,
      email: jwtPayload.email,
      avatar: jwtPayload.picture,
    };

    fetch("http://localhost:8080/api/auth/login", {
      //fetch("https://coursecompass-demo.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Backend verification failed");
        return res.json();
      })
      .then((data) => {
        console.log("Authenticated user:", data);
        setUserProfile(data);
        // localStorage.setItem("userProfile", JSON.stringify(data));
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });

    setUserAuthInfo(userInfo);
    storeUserAuthInfo(userInfo);
  }

  useEffect(() => {
    const storedUserAuthInfo = localStorage.getItem("userAuthInfo");

    if (storedUserAuthInfo) {
      setUserAuthInfo(JSON.parse(storedUserAuthInfo));
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

        //Cleanup the url for security reason
        window.history.replaceState(null, "", window.location.pathname);
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

  function handleLogout() {
    setUserAuthInfo(null);
    localStorage.removeItem("userAuthInfo");
    localStorage.removeItem("google_nonce");
    setUserProfile(null);
    window.location.href = "/";
  }

  return (
    <div>
      {!userAuthInfo && (
        <div>
          <Avatar className="w-15 h-15">
            <AvatarFallback>
              <UserIcon size={50} className="text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <Button onClick={() => handleLogin()} className="">
            Login <LogIn size={20} className="ml-2" />
          </Button>
        </div>
      )}
      {userAuthInfo && (
        <div>
          <Avatar className="w-15 h-15">
            <AvatarImage src={userAuthInfo.avatar || ""} />
            <AvatarFallback>
              <UserIcon size={50} className="text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <Button onClick={() => handleLogout()} className="">
            Logout <LogOut size={20} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
