import axios from "axios";
import { useState, useEffect } from "react";
import ProgressCard from "@/components/my-components/ProgressCard";
import ProfileCard from "@/components/my-components/ProfileCard";
import CourseRatingCard from "@/components/my-components/CourseRatingCard";
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

  //major: string;
  //minor: string;
  //profilePictureUrl: string;
  //bio: string;
  //socialLinks: string[];
  //preferences;
  //: {
  //  theme: string;    
  //  notificationsEnabled: boolean;
  //};
  //settings: { 
  //}

}

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      //.get("https://coursecompass-demo.onrender.com/api/users")
      .get("http://localhost:8080/api/users")
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
        Loading...{" "}
      </div>
    );
  }

  return (
      <div className="p-6 mx-8 space-y-10">
      <ProfileCard user={user} />
      <ProgressCard user={user} />
      <CourseRatingCard user={user} />
      </div>
  );
}
