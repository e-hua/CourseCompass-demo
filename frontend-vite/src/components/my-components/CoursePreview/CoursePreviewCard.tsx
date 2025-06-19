import type { CoursePreview } from "@/apis/CoursePreviewAPI";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Stars from "@/components/my-components/Stars";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CoursePreviewCard({
  course,
}: {
  course: CoursePreview;
}) {
  const ratingMap = [
    {
      label: "Difficulty",
      value: course?.averageDifficulty ?? 0,
    },
    {
      label: "Workload",
      value: course?.averageWorkload ?? 0,
    },
    {
      label: "Enjoyability",
      value: course?.averageEnjoyability ?? 0,
    },
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    try {
      navigate("/courses/" + course.courseCode);
    } catch (err) {
      toast.error("Failed to open course page. Course not be available." + err);
    }
  };

  return (
    <Card
      className="p-4 border border-transparent hover:border-muted-foreground/50 hover:scale-[1.01] transition-transform"
      onClick={() => handleClick()}
    >
      <div className="text-sm text-muted-foreground">{course.courseCode}</div>

      <div className="font-semibold text-lg">{course.courseTitle}</div>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-muted dark:text-blue-300">
          {course.units} MCs
        </span>
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            course.su
              ? "bg-green-100 text-green-800 dark:bg-muted dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-muted dark:text-red-300"
          }`}
        >
          {course.su ? "SU Available" : "SU Not Available"}
        </span>

        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-muted dark:text-purple-300">
          {course.faculty}
        </span>

        {course.semesters.map((sem) => (
          <span
            key={sem}
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-muted dark:text-yellow-200"
          >
            Sem {sem}
          </span>
        ))}
      </div>

      <Separator />

      <div className="flex space-x-1 items-center w-2 h-2">
        <p className="text-sm text-muted-foreground">
          {course?.ratingCount ?? 0}{" "}
        </p>
        <p className="text-sm ">
          {(course?.ratingCount ?? 0) === 1 ? "Rating" : "Ratings"}
        </p>
      </div>

      {ratingMap.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between w-full text-sm"
        >
          <div className="text-sm">{label}</div>

          <div className="flex space-x-1 items-center">
            <Stars value={value} />
            <strong>{value.toFixed(1)}</strong>
            <p className="text-muted-foreground whitespace-pre-line transition-all">
              / 5
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
}
