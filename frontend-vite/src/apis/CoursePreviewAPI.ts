const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://coursecompass-demo.onrender.com/api/";

import type { CoursePreviewFilter } from "@/components/my-components/CoursePreview/FilterPopover";
import type { CoursePreviewSorter } from "@/components/my-components/CoursePreview/SorterPopover";

export interface CoursePreview {
  courseCode: string;
  courseTitle: string;
  units: number;
  su: boolean;
  semesters: number[];
  faculty: string;
  averageDifficulty: number;
  averageWorkload: number;
  averageEnjoyability: number;
  ratingCount: number;
}
export type PageDTO<T> = {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
export type CoursePreviewPage = PageDTO<CoursePreview>;

export async function fetchCoursePreview(
  moduleCode: string
): Promise<CoursePreview> {
  const res = await fetch(API_URL + "coursePreviews/" + moduleCode);

  if (!res.ok) {
    throw new Error("Failed to fetch course preview for " + moduleCode);
  }

  return res.json();
}

export async function fetchCoursePreviewPage(
  page: number,
  searchTerm: string,
  filter: CoursePreviewFilter,
  sorter: CoursePreviewSorter,
  isSorting: boolean = false,
  size: number = 12
): Promise<CoursePreviewPage> {
  const semestersQuery = filter?.semesters?.length
    ? filter.semesters.map((sem) => `semesters=${sem}`).join("&")
    : "";

  const response = await fetch(
    (isSorting
      ? API_URL + "coursePreviews/previews/rated"
      : API_URL + "coursePreviews") +
      `?page=${page}&size=${size}&su=${filter?.su ?? ""}&faculty=${
        filter?.faculty ?? ""
      }&${semestersQuery}&search=${searchTerm}&sortBy=${
        sorter.sortBy
      }&descending=${sorter.descending}`
  );
  return await response.json();
}
