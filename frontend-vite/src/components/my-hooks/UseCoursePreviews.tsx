import {
  fetchCoursePreviewPage,
  type CoursePreviewPage,
} from "@/apis/CoursePreviewAPI";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { CoursePreviewFilter } from "../my-components/CoursePreview/FilterPopover";
import type { CoursePreviewSorter } from "../my-components/CoursePreview/SorterPopover";

export function useCoursePreviews(
  searchTerm: string,
  filter: CoursePreviewFilter,
  sorter: CoursePreviewSorter,
  isSorting: boolean
) {
  return useInfiniteQuery<
    CoursePreviewPage,
    Error,
    InfiniteData<CoursePreviewPage, number>,
    [
      "coursePreviews",
      string,
      CoursePreviewFilter,
      CoursePreviewSorter,
      boolean
    ],
    number
  >({
    queryKey: ["coursePreviews", searchTerm, filter, sorter, isSorting],
    queryFn: async ({ pageParam }) =>
      await fetchCoursePreviewPage(
        pageParam,
        searchTerm,
        filter,
        sorter,
        isSorting
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
}
