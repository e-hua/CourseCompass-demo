import {
  fetchCoursePreviewPage,
  type CoursePreviewPage,
} from "@/apis/CoursePreviewAPI";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { CoursePreviewFilter } from "../my-components/FilterPopover";

export function useCoursePreviews(
  searchTerm: string,
  filter: CoursePreviewFilter
) {
  return useInfiniteQuery<
    CoursePreviewPage,
    Error,
    InfiniteData<CoursePreviewPage, number>,
    ["coursePreviews", string, CoursePreviewFilter],
    number
  >({
    queryKey: ["coursePreviews", searchTerm, filter],
    queryFn: async ({ pageParam }) =>
      await fetchCoursePreviewPage(pageParam, searchTerm, filter),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
}
