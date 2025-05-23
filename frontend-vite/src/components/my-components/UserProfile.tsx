import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TakenCourse {
  id: number;
  semesterIndex: number;
  letterGrade: string;
  units: number;
}

export interface CourseRating {
  id: number;
  createdAt: string;
  updatedAt: string;
  difficulty: number;
  averageWorkload: number;
  enjoyability: number;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  gpa: number;
  currentSemesterIndex: number;
  email: string;
  bookmarkedCourseIds: string[];
  plannedCourseIds: string[];
  takenCourses: TakenCourse[];
  courseRatings: CourseRating[];
}

export default function UserProfile() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("https://coursecompass-demo.onrender.com/api/users")
      .then((profiles) => {
        setLoading(false);
        setUser(profiles.data[0]);
      })
      .catch((error) => {
        console.error("No valid profile to fetch", error);
        setLoading(false);
      });
  }, []);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        Loading.....{" "}
      </div>
    );
  }

  return (
    <div className=" mx-8 p-6 space-y-10">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {user.userName}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>GPA:</strong> {user.gpa.toFixed(2)}
          </div>
          <div>
            <strong>Semester:</strong> Y
            {Math.floor((user.currentSemesterIndex + 1) / 2)}S
            {user.currentSemesterIndex % 2 == 0 ? 2 : 1}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
