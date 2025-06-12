import { useEffect, useState } from "react";
import Layout from "@/components/Sidebar/layout";
import CoursePreviewCard from "@/components/my-components/CoursePreviewCard";
import { fetchCoursePreview } from "@/apis/CoursePreviewAPI";
import type { CoursePreview } from "@/apis/CoursePreviewAPI";
import { Command, CommandInput } from "@/components/diy-ui/UnderlineCommand";
import { toast } from "sonner";

const MODULE_CODES = [
  "CS1101S",
  "MA2108S",
  "CS2030S",
  "CS2040S",
  "CS2100",
  "CS2103T",
  "CS2101",
];

const PAGE_SIZE = 6;

export default function CoursesPage() {
  const [page, setPage] = useState(0);
  const [previews, setPreviews] = useState<CoursePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const start = page * PAGE_SIZE;
    const currentPageCodes = MODULE_CODES.slice(start, start + PAGE_SIZE);

    Promise.all(currentPageCodes.map((x) => fetchCoursePreview(x)))
      .then((data) => setPreviews(data))
      .catch((e) => toast.error(e))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <Layout>
      <div className="p-4">
        <Command>
          <CommandInput />
        </Command>
      </div>
      <div className="p-6 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {previews.map((course) => (
              <CoursePreviewCard key={course.courseCode} course={course} />
            ))}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-4 py-1 bg-muted rounded hover:bg-muted/70 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={(page + 1) * PAGE_SIZE >= MODULE_CODES.length}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 bg-muted rounded hover:bg-muted/70 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}
