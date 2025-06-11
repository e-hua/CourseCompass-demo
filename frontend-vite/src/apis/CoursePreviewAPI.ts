const API_URL = "http://localhost:8080/api/";
// const API_URL = "https://coursecompass-demo.onrender.com/api/";

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

export async function fetchCoursePreview(
  moduleCode: string
): Promise<CoursePreview> {
  const res = await fetch(API_URL + "coursePreviews/" + moduleCode);

  if (!res.ok) {
    throw new Error("Failed to fetch course preview for " + moduleCode);
  }

  return res.json();
}
