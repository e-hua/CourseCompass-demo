import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchModData, type Course } from "@/apis/FetchModDataAPI";
import Layout from "@/components/Sidebar/layout";
import { Separator } from "@/components/ui/separator";
import { fetchCourseStats, type CourseStats } from "@/apis/CourseStatsAPI";
import Stars from "@/components/my-components/Stars";

export default function CoursePage() {
  const { moduleCode } = useParams<{ moduleCode: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [courseStats, setCourseStats] = useState<CourseStats | null>(null);

  useEffect(() => {
    if (moduleCode) {
      fetchModData(moduleCode).then((x) => setCourse(x));
      fetchCourseStats(moduleCode).then((x) => setCourseStats(x));
    }
  }, [moduleCode]);

  if (!course) return <div className="p-4">Loading...</div>;

  const ratingMap = [
    {
      label: "Difficulty",
      value: courseStats?.averageDifficulty ?? 0,
    },
    {
      label: "Workload",
      value: courseStats?.averageWorkload ?? 0,
    },
    {
      label: "Enjoyability",
      value: courseStats?.averageEnjoyability ?? 0,
    },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8 shadow-xl ">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{course.moduleCode}</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>

          <Separator />

          <div className="flex space-x-1 items-center">
            <p className="text-sm text-muted-foreground">
              {courseStats?.ratingCount ?? 0}{" "}
            </p>
            <p className="text-sm ">
              {(courseStats?.ratingCount ?? 0) === 1 ? "Rating" : "Ratings"}
            </p>
          </div>

          {ratingMap.map(({ label, value }) => (
            <div key={label} className="space-y-1">
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

          <Separator />

          <div className="space-y-2 text-sm">
            <p>
              <strong>Credits:</strong> {course.credits}
            </p>
            <p>
              <strong>Semester Offered:</strong>{" "}
              {course.semesterData.map((s) => "Sem " + s.semester).join(", ")}
            </p>
            <p>
              <strong>Department:</strong> {course.department}
            </p>
            <p>
              <strong>Faculty:</strong> {course.faculty}
            </p>
            {
              <>
                <p>
                  <strong>Prerequisite:</strong>
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-line transition-all">
                  {course.prerequisite ?? "None"}
                </p>
              </>
            }
            {
              <>
                <p>
                  <strong>Corequisite:</strong>
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-line transition-all">
                  {course.prerequisite ?? "None"}
                </p>
              </>
            }
            {
              <>
                <p>
                  <strong>Preclusion:</strong>
                </p>
                <p className="text-sm text-muted-foreground whitespace-pre-line transition-all">
                  {course.preclusion ?? "None"}
                </p>
              </>
            }
            <div>
              <strong>Description:</strong>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
                <p
                  className={`text-sm text-muted-foreground whitespace-pre-line transition-all ${
                    expanded ? "line-clamp-none" : "line-clamp-5"
                  }`}
                >
                  {course.description}
                </p>
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="text-xs hover:underline"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
