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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      const user = JSON.parse(profile);
      setUser(user);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl">You’re not logged in</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Please log in to view your dashboard.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-8 p-6 space-y-10">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {user.userName}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>GPA:</strong>{" "}
            {user.gpa ? user.gpa.toFixed(2) : <> Please update your gpa</>}
          </div>
          <div>
            <strong>Semester:</strong>
            {!user.currentSemesterIndex ? (
              <> Please update your current semesterIndex</>
            ) : (
              <>
                {Math.floor((user.currentSemesterIndex + 1) / 2)}S
                {user.currentSemesterIndex % 2 === 0 ? 2 : 1}
              </>
            )}
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
