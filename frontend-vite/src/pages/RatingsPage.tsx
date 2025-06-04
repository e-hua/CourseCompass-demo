import Layout from "@/components/Sidebar/layout";
import RatingCard from "@/components/my-components/RatingCard";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { Skeleton } from "@/components/ui/skeleton";

function SearchPage() {
  const { data: courses, isLoading, error } = useTakenCourses();

  if (isLoading)
    return (
      <Layout>
        <div className="p-4">
          <Skeleton className="rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="m-10 p-6 mx-auto space-y-5  w-200 h-100" />
            <Skeleton className="m-10 p-6 mx-auto space-y-5  w-200 h-100" />
            <Skeleton className="m-10 p-6 mx-auto space-y-5  w-200 h-100" />
          </div>
        </div>
      </Layout>
    );
  if (error) return <p>Error message: {error.message}</p>;

  return (
    <Layout>
      <div>
        {courses?.map((course) => (
          <RatingCard key={course.id} courseName={course.courseCode} />
        ))}
      </div>
    </Layout>
  );
}

export default SearchPage;
