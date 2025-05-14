import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

import "@/index.css";

const CourseCompassDashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user-profile")
      .then((response) => {
        setUserProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
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
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="p-6  mx-auto space-y-10">
      <Card className="w-180 p-4">
        <h4 className="text-xl font-bold">Welcome, {userProfile.name}!</h4>
        <h6 className="text-xl">
          {userProfile.major} | GPA: {userProfile.gpa}
        </h6>
      </Card>

      <Card className="w-180 p-4">
        <h5 className="text-xl font-bold">Your Roadmap</h5>
        <CardContent>
          {userProfile.roadmap.map((semester: any, index: number) => (
            <div key={index} className="mt-4">
              <h6 className="text-xl font-medium">{semester.semester}</h6>
              <ul className="list-disc list-inside">
                {semester.courses.map((course: any, idx: number) => (
                  <li key={idx}>
                    {course.code} - {course.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="w-180 p-6">
        <h5 className="text-xl font-bold">Your Ratings for Courses</h5>
        <CardContent>
          {userProfile.completedCourses.map((course: any, index: number) => (
            <div key={index} className="mt-4">
              <ul className="list-disc list-inside">
                <li key={index}>{course.code}</li>
                <p>Difficulty Rating: {course.difficultyRating}</p>
                <p>Workload Rating: {course.workloadRating}</p>
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCompassDashboard;
