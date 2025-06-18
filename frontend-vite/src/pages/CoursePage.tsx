import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchModData, type Course } from "@/apis/FetchModDataAPI";
import Layout from "@/components/Sidebar/layout";
import { Separator } from "@/components/ui/separator";
import { fetchCourseStats, type CourseStats } from "@/apis/CourseStatsAPI";
import Stars from "@/components/my-components/Stars";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTakenCourse } from "@/apis/TakenCourseAPI";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UpdateTakenCourseDialog } from "@/components/my-components/UpdateTakenCourseDialog";
import { AddTakenCourseDialog } from "@/components/my-components/AddTakenCourseDialog";
import CommentList from "@/components/my-components/Comments/CommentList";
import PostCommentForm from "@/components/my-components/Comments/PostCommentForm";

export default function CoursePage() {
  const { moduleCode } = useParams<{ moduleCode: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [courseStats, setCourseStats] = useState<CourseStats | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  const { userProfile, toggleBookmark } = useUserProfile();
  const isBookmarked = (userProfile?.bookmarkedCourseIds ?? []).includes(
    course?.moduleCode ?? "a"
  );

  const { data: takenCourses } = useTakenCourses();

  const queryClient = useQueryClient();
  const handleDelete = useMutation({
    mutationFn: (id: number) => deleteTakenCourse(id),
    onSuccess: () => {
      toast.success("Course deleted from Taken Courses!");
      queryClient.invalidateQueries({ queryKey: ["takenCourses"] });
    },
    onError: () => {
      toast.error("Failed to delete the course from Taken Courses");
    },
  });

  useEffect(() => {
    if (moduleCode) {
      fetchModData(moduleCode).then((x) => setCourse(x));
      fetchCourseStats(moduleCode).then((x) => setCourseStats(x));
    }
  }, [moduleCode]);

  if (!course)
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    );

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
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-row justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              {course.moduleCode}
            </div>
            <h1 className="text-2xl font-semibold">{course.title}</h1>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-muted dark:text-blue-300">
                {course.credits} MCs
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

              {course.semesterData.map((s) => (
                <span
                  key={s.semester}
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-muted dark:text-yellow-200"
                >
                  Sem {s.semester}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-stretch w-full md:w-60">
            <Button
              onClick={() => toggleBookmark(course.moduleCode)}
              className="flex gap-2 justify-center items-center"
            >
              {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
            </Button>

            {takenCourses?.some((tc) => tc.courseCode === course.moduleCode) ? (
              <>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDelete.mutate(
                      takenCourses.find(
                        (tc) => tc.courseCode === course.moduleCode
                      )!.id
                    )
                  }
                >
                  Remove from Taken Courses
                </Button>
                <UpdateTakenCourseDialog
                  takenCourse={
                    takenCourses.find(
                      (tc) => tc.courseCode === course.moduleCode
                    )!
                  }
                />
              </>
            ) : (
              <AddTakenCourseDialog
                courseCode={course.moduleCode}
                units={course.credits}
              />
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center space-x-1">
          <p className="text-sm text-muted-foreground">
            {courseStats?.ratingCount ?? 0}
          </p>
          <p className="text-sm">
            {(courseStats?.ratingCount ?? 0) === 1 ? "Rating" : "Ratings"}
          </p>
        </div>

        <div className="space-y-2 mt-2">
          {ratingMap.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center text-sm"
            >
              <div>{label}</div>
              <div className="flex items-center space-x-1">
                <Stars value={value} />
                <strong>{value.toFixed(1)}</strong>
                <p className="text-muted-foreground">/ 5</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 text-sm">
          <p>
            <strong>Department:</strong> {course.department}
          </p>
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
        </div>
        <Separator className="my-4" />
        <div className="my-5">
          <PostCommentForm
            courseCode={course.moduleCode}
            onSuccess={() => setRefreshTrigger(!refreshTrigger)}
          />
        </div>
        <CommentList
          courseCode={course.moduleCode}
          refreshTrigger={refreshTrigger}
        />
      </div>
    </Layout>
  );
}
