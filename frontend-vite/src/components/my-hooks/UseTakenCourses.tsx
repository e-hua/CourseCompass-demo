import { useEffect, useState, useCallback } from "react";

export interface TakenCourse {
  id: number;
  semesterIndex: number;
  letterGrade: string;
  courseName: string;
  courseCode: string;
  rating?: number;
}

export function useTakenCourses() {
  const [courses, setCourses] = useState<TakenCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        console.log(" Final Authorization header:", `Bearer ${localStorage.getItem("id_token")}`);

        
      const res = await fetch("http://localhost:8080/api/user/taken-courses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch taken courses");
      const data = await res.json();
      setCourses(data);
    } catch (err : unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
}
