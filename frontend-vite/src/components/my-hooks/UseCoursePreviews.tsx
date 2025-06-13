import {
  fetchCoursePreviewPage,
  type CoursePreviewPage,
} from "@/apis/CoursePreviewAPI";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

export function useCoursePreviewPages() {
  return useInfiniteQuery<
    CoursePreviewPage,
    Error,
    InfiniteData<CoursePreviewPage, number>,
    ["coursePreviews"],
    number
  >({
    queryKey: ["coursePreviews"],
    queryFn: async ({ pageParam }) => await fetchCoursePreviewPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
}
