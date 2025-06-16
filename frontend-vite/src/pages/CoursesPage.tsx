import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Sidebar/layout";
import CoursePreviewCard from "@/components/my-components/CoursePreviewCard";
import { useCoursePreviews } from "@/components/my-hooks/UseCoursePreviews";
import type { CoursePreview, CoursePreviewPage } from "@/apis/CoursePreviewAPI";
import { UnderlinedSearchBar } from "@/components/diy-ui/UnderlinedSearchBar";
import {
  FilterPopover,
  type CoursePreviewFilter,
} from "@/components/my-components/FilterPopover";
import {
  SorterPopover,
  type CoursePreviewSorter,
} from "@/components/my-components/SorterPopover";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Set the default selected semesters
  const [filter, setFilter] = useState<CoursePreviewFilter>({
    semesters: [1, 2],
  });

  // Set the default sorting rules
  const [sorter, setSorter] = useState<CoursePreviewSorter>({
    descending: false,
  });

  const isSorting = !!sorter.sortBy;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useCoursePreviews(searchTerm, filter, sorter, isSorting);

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
      <div className="flex p-4 space-x-10">
        <UnderlinedSearchBar
          className="w-220"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterPopover filter={filter} onChange={(val) => setFilter(val)} />
        <SorterPopover sorter={sorter} onChange={(val) => setSorter(val)} />
      </div>

      <div className="p-6 space-y-4">
        {status === "pending" ? (
          <></>
        ) : status === "error" ? (
          <p>Error: {(error as Error).message}</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {data?.pages.flatMap((page: CoursePreviewPage) =>
                page?.content?.map((course: CoursePreview) => (
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
