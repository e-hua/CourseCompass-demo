import Layout from "@/components/Sidebar/layout";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import BookmarkCard from "@/components/my-components/BookmarkCard";

export interface CourseInfo {
  moduleCode: string;
  title: string;
  description: string;
  moduleCredit: string;
}

export default function BookmarkPage() {
  const { userProfile } = useUserProfile();
  const bookmarked = userProfile?.bookmarkedCourseIds ?? [];

  const [modules, setModules] = useState<CourseInfo[]>([]);

  useEffect(() => {
    if (!bookmarked.length) {
      // This was to trigger the re-rendering of react.
      setModules([]);
      return;
    }

    Promise.all(
      bookmarked.map((courseId) =>
        fetch(
          "https://api.nusmods.com/v2/2024-2025/modules/" + courseId + ".json"
        )
          .then((res) => res.json())
          .then((data) => ({
            moduleCode: data.moduleCode,
            title: data.title,
            description: data.description,
            moduleCredit: data.moduleCredit,
          }))
      )
    ).then((mods) => setModules(mods));
  }, [bookmarked]);

  return (
    <Layout>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Bookmarked Modules</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {modules.map((m) => (
            <BookmarkCard key={m.moduleCode} {...m} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
