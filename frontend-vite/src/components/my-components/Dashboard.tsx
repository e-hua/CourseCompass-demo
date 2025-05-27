import { useState, useEffect } from "react";
import { useUserProfile } from "../my-contexts/UserProfileContext";
import UserProfileCard from "./UserProfileCard";

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
  const { userProfile, setUserProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(true);

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

  return <UserProfileCard userProfile={userProfile} />;
}