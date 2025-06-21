import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, LogIn, LogOut } from "lucide-react";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import { loginWithIdToken } from "@/apis/AuthAPI";
import { toast } from "sonner";
import { updateUserProfile } from "@/apis/UserAPI";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function GoogleLogin() {
  const navigate = useNavigate();
  const [userAuthInfo, setUserAuthInfo] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);
  const { userProfile, setUserProfile } = useUserProfile();

  function storeUserAuthInfo(userAuthInfo: {
    name: string;
    email: string;
    avatar: string;
  }) {
    localStorage.setItem("userAuthInfo", JSON.stringify(userAuthInfo));
  }

  function handleToken(idToken: string) {
    localStorage.setItem("id_token", idToken);
    const jwtPayload = JSON.parse(atob(idToken.split(".")[1]));
    const userInfo = {
      name: jwtPayload.name,
      email: jwtPayload.email,
      avatar: jwtPayload.picture,
    };

    // Imported form @/apis/Auth.ts
    loginWithIdToken(idToken)
      .then((data) => {
        console.log("Authenticated user:", data);
        toast.success("User Authenticated !");
        setUserProfile(data);
      })
      .catch((err) => {
        toast.error("Login failed", {
          description: err.message || "Could not authenticate user",
        });
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
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      "client_id=" +
      CLIENT_ID +
      "&" +
      "redirect_uri=" +
      REDIRECT_URI +
      "&" +
      "response_type=id_token" +
      "&" +
      "scope=openid profile email&" +
      "state=state_parameter_passthrough_value&" +
      "nonce=" +
      nonce;

    window.location.href = oauthUrl;
  }

  async function handleLogout() {
    if (!userProfile) {
      setUserAuthInfo(null);
      setUserProfile(null);
      localStorage.removeItem("userAuthInfo");
      localStorage.removeItem("google_nonce");
      localStorage.removeItem("id_token");
      setTimeout(() => {
        navigate("/");
      }, 200);
      toast.error("Failed to retrieve user profile");
      return;
    }

    try {
      const idToken = localStorage.getItem("id_token");
      if (!idToken) throw new Error("No token found");

      // Imported from @/apis/UserAPI.ts
      const res = await updateUserProfile(
        {
          ...userProfile,
          userName: userProfile?.userName ?? "",
          currentSemesterIndex: userProfile?.currentSemesterIndex ?? 1,
          bookmarkedCourseIds: userProfile?.bookmarkedCourseIds ?? [],
          major: userProfile?.major ?? "",
        },
        idToken
      );

      if (!res.ok) {
        const err = await res.json();
        toast.error("Failed to save profile before logout", {
          description: err.error || "Unknown error",
        });
      }
      toast.success("User logged out !");
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : typeof e === "string"
          ? e
          : "Unknown error";
      toast.error("Logout failed to sync data", { description: message });
    }

    setUserAuthInfo(null);
    setUserProfile(null);
    localStorage.removeItem("userAuthInfo");
    localStorage.removeItem("google_nonce");
    localStorage.removeItem("id_token");
    setTimeout(() => {
      navigate("/");
    }, 200);
  }

  return (
    <div>
      {!userAuthInfo && (
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>
              <UserIcon size={24} className="text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <Button onClick={() => handleLogin()} className="">
            Login <LogIn size={16} />
          </Button>
        </div>
      )}
      {userAuthInfo && (
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={userAuthInfo.avatar || ""} />
            <AvatarFallback>
              <UserIcon size={24} className="text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <Button onClick={() => handleLogout()} className="">
            Logout <LogOut size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
