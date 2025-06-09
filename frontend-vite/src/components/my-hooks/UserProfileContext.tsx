import { createContext, useContext, useState, useEffect } from "react";
import { type User } from "@/components/my-components/Dashboard";
import { toast } from "sonner";
import { loginWithIdToken } from "@/apis/AuthAPI";

const UserContext = createContext<{
  userProfile: User | null;
  setUserProfile: (user: User | null) => void;
  toggleBookmark: (moduleCode: string) => void;
  refetchUserProfile: () => Promise<void>;
}>({
  userProfile: null,
  setUserProfile: () => {},
  toggleBookmark: () => {},
  refetchUserProfile: async () => {},
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

  const toggleBookmark = (moduleCode: string) => {
    if (!userProfile) {
      return;
    }

    const isBookmark = userProfile.bookmarkedCourseIds.includes(moduleCode);

    if (!isBookmark) {
      const updatedBookmarks = [...userProfile.bookmarkedCourseIds, moduleCode];
      setUserProfile({ ...userProfile, bookmarkedCourseIds: updatedBookmarks });

      toast.success("Bookmarked", {
        description: moduleCode + " has been added to your bookmarks.",
      });
    } else {
      const updatedBookmarks = [
        ...userProfile.bookmarkedCourseIds.filter(
          (code: string) => code !== moduleCode
        ),
      ];
      setUserProfile({ ...userProfile, bookmarkedCourseIds: updatedBookmarks });
      toast.success("Bookmark removed", {
        description: moduleCode + " has been removed from your bookmarks.",
      });
    }
  };

  const refetchUserProfile = async () => {
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      console.warn("No ID token found in localStorage.");
      return;
    }

    try {
      const user = await loginWithIdToken(idToken);
      setUserProfile(user);
    } catch (err) {
      console.error("Refetch failed", err);
      toast.error("Failed to refetch user profile");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        toggleBookmark,
        refetchUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserContext);
