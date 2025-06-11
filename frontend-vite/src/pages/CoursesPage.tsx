import { Command, CommandInput } from "@/components/diy-ui/UnderlineCommand";
import CoursePreviewCard from "@/components/my-components/CoursePreviewCard";
import Layout from "@/components/Sidebar/layout";
import {
  fetchCoursePreview,
  type CoursePreview,
} from "@/apis/CoursePreviewAPI";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [preview, setPreview] = useState<CoursePreview | null>(null);
  const [preview2, setPreview2] = useState<CoursePreview | null>(null);

  useEffect(() => {
    fetchCoursePreview("CS1101S").then(setPreview).catch(console.error);
    fetchCoursePreview("MA2108S").then(setPreview2).catch(console.error);
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <Command>
          <CommandInput />
          {preview ? <CoursePreviewCard course={preview} /> : <p>Loading...</p>}
          {preview2 ? (
            <CoursePreviewCard course={preview2} />
          ) : (
            <p>Loading...</p>
          )}
        </Command>
      </div>
    </Layout>
  );
}
