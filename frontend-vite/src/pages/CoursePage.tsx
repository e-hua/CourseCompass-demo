import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchModData, type Course } from "@/apis/FetchModDataAPI";
import Layout from "@/components/Sidebar/layout";
import { Separator } from "@/components/ui/separator";
export default function CoursePage() {
  const { moduleCode } = useParams<{ moduleCode: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (moduleCode) {
      fetchModData(moduleCode).then(setCourse);
    }
  }, [moduleCode]);

  if (!course) return <div className="p-4">Loading...</div>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8 shadow-xl rounded-2xl mt-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{course.moduleCode}</h1>
            <p className="text-muted-foreground">{course.title}</p>
          </div>

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
