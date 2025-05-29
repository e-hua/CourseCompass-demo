import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/components/diy-ui/SearchBar";

interface CourseInfoCardProps {
    course: Course;
}   

export default function CourseInfoCard({course} : CourseInfoCardProps) {
    return (
        <Card className="w-80 p-4 border rounded shadow bg-white dark:bg-slate-800">
        <CardHeader>
            <CardTitle className="text-lg font-bold">{course.moduleCode}: {course.title}</CardTitle>
            <CardDescription>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Semester:</strong> {course.semesterOffered}</p>
      <p><strong>Prerequisites:</strong> {course.prerequisites.join(", ") || "None"}</p>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{course.description}</p>
        </CardContent>
        </Card>
      
  );
}

