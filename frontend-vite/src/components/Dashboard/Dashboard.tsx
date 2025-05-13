import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card className="p-4">
        <Typography variant="h4" fontWeight="bold">
          Welcome, {userProfile.name}!
        </Typography>
        <Typography>
          {userProfile.major} | GPA: {userProfile.gpa}
        </Typography>
      </Card>

      <Card className="p-4">
        <Typography variant="h5" fontWeight="bold">
          Your Roadmap
        </Typography>
        <CardContent>
          {userProfile.roadmap.map((semester: any, index: number) => (
            <div key={index} className="mt-4">
              <Typography variant="h6" fontWeight="medium">
                {semester.semester}
              </Typography>
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

      <Card className="p-4">
        <Typography variant="h5" fontWeight="bold">
          Your Rating on courses
        </Typography>
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
