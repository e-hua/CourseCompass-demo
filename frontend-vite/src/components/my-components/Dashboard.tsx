import { useState, useEffect } from "react";
import { useUserProfile } from "../my-hooks/UserProfileContext";
import ProgressCard from "./ProgressCard";
import ProfileFields from "./ProfileFields";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface TakenCourse {
  id: number;
  semesterIndex: number;
  letterGrade: string;
  units: number;
}

export interface CourseRating {
  id: number;
  courseCode: string;
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
  const { setUserProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(true);
  const { userProfile } = useUserProfile();

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      const userProfile = JSON.parse(profile);
      setUserProfile(userProfile);
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

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl">You're not logged in</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Please log in to view your dashboard.
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className=" mx-8 p-6 space-y-10">
        <ProfileFields />
        <ProgressCard />
      </div>
    );
  }
}
