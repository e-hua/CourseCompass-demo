import { createContext, useContext, useState, useEffect } from "react";
import { type User } from "@/components/my-components/Dashboard";

const UserContext = createContext<{
  userProfile: User | null;
  setUserProfile: (user: User | null) => void;
}>({
  userProfile: null,
  setUserProfile: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfileState] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setUserProfileState(JSON.parse(stored));
  }, []);

  const setUserProfile = (userProfile: User | null) => {
    setUserProfileState(userProfile);
    if (userProfile)
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    else localStorage.removeItem("userProfile");
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserContext);
