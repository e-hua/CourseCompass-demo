import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserProfile } from "../my-contexts/UserProfileContext";

export default function ProgressCard() {
  const { userProfile } = useUserProfile();
  const currentSemesterIndex = !userProfile
    ? 1
    : userProfile.currentSemesterIndex === null
    ? 1
    : userProfile.currentSemesterIndex;

  const takenCourses = !userProfile
    ? []
    : !userProfile.takenCourses
    ? []
    : userProfile.takenCourses;

  const degreeProgress =
    (takenCourses.reduce((acc, course) => {
      const units = course.units || 0;
      return acc + course.letterGrade !== "F" ? units : 0;
    }, 0) *
      100) /
    160;

  const semesterProgress = (currentSemesterIndex * 100) / 8;
  return (
    <Card className="m-10 p-6 mx-auto space-y-5  w-200 h-50">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Progress</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center space-x-2">
        <>
          <CardTitle>Degree Progress</CardTitle>
          <Progress value={degreeProgress} className="w-full h-3" />
          <CardTitle>Semester Progress</CardTitle>
          <Progress value={semesterProgress} className="w-full h-3" />
        </>
      </CardContent>
    </Card>
  );
}
