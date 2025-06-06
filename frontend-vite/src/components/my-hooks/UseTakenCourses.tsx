import { useQuery } from "@tanstack/react-query";
import { fetchTakenCourses, type TakenCourse } from "@/apis/TakenCourseAPI";

export function useTakenCourses() {
  return useQuery<TakenCourse[]>({
    queryKey: ["takenCourses"],
    queryFn: fetchTakenCourses,
  });
}
