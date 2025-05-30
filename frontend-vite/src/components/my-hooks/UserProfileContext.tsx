import { createContext, useContext, useState, useEffect } from "react";
import { type User } from "@/components/my-components/Dashboard";
import { toast } from "sonner";

const UserContext = createContext<{
  userProfile: User | null;
  setUserProfile: (user: User | null) => void;
  toggleBookmark: (moduleCode: string) => void;
}>({
  userProfile: null,
  setUserProfile: () => {},
  toggleBookmark: () => {},
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

  return (
    <UserContext.Provider
      value={{ userProfile, setUserProfile, toggleBookmark }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserContext);
