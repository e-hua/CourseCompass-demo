import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const degreeProgress = 25; // Example progress value, should be fetched from API afterwards
const semesterProgress = 100; // Example progress value, should be fetched from API afterwards

export default function DegreeProgressCard() {
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