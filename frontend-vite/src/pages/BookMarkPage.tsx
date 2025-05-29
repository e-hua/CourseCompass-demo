import Layout from "@/components/Sidebar/layout";
import SearchBar from "@/components/diy-ui/SearchBar";
import { useState } from "react";
import type { Course } from "@/components/diy-ui/SearchBar";

function BookmarkPage() {

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
    const handleCourseSelect = (course: Course | null) => {
      setSelectedCourse(course);
    };
  return (
    <Layout>
      <SearchBar onSelectCourse={handleCourseSelect}/>
      <div className="flex flex-col items-center mt-4">
        <h5 className="text-xl font-bold text-center">
          Please Choose among the courses you bookmarked!
        </h5>
      </div>
    </Layout>
  );
}

export default BookmarkPage;
