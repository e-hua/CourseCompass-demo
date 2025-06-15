import {
  fetchCoursePreviewPage,
  type CoursePreviewPage,
} from "@/apis/CoursePreviewAPI";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

export function useCoursePreviewPages(searchTerm: string) {
  return useInfiniteQuery<
    CoursePreviewPage,
    Error,
    InfiniteData<CoursePreviewPage, number>,
    ["coursePreviews", string],
    number
  >({
    queryKey: ["coursePreviews", searchTerm],
    queryFn: async ({ pageParam }) =>
      await fetchCoursePreviewPage(pageParam, searchTerm),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
}
