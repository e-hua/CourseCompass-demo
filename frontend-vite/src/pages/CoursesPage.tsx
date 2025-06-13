import { useEffect, useRef } from "react";
import Layout from "@/components/Sidebar/layout";
import CoursePreviewCard from "@/components/my-components/CoursePreviewCard";
import { Command, CommandInput } from "@/components/diy-ui/UnderlineCommand";
import { useCoursePreviewPages } from "@/components/my-hooks/UseCoursePreviews";
import type { CoursePreview, CoursePreviewPage } from "@/apis/CoursePreviewAPI";

export default function CoursesPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useCoursePreviewPages();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);
  return (
    <Layout>
      <div className="p-4">
        <Command>
          <CommandInput />
        </Command>
      </div>

      <div className="p-6 space-y-4">
        {status === "pending" ? (
          <>Pending</>
        ) : status === "error" ? (
          <p>Error: {(error as Error).message}</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {data?.pages.flatMap((page: CoursePreviewPage) =>
                page.content.map((course: CoursePreview) => (
                  <CoursePreviewCard key={course.courseCode} course={course} />
                ))
              )}
            </div>

            <div ref={sentinelRef} className="h-10 w-full" />

            {isFetchingNextPage && (
              <p className="text-center mt-2">Loading more...</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
