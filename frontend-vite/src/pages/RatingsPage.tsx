import Layout from "@/components/Sidebar/layout";
import RatingCard from "@/components/my-components/RatingCard";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";

function SearchPage() {

  const { courses, loading, error} = useTakenCourses();

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <Layout>
      <div>
        <RatingCard courseName={"CS2030S"} />
        <RatingCard courseName={"CS2040S"} />
        <RatingCard courseName={"CS2100"} />
        {courses.map((course) => (
          <RatingCard key={course.id} courseName={course.courseCode} />
        ))}
      </div>
    </Layout>
  );
}

export default SearchPage;
