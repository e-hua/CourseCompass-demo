import Layout from "@/components/Sidebar/layout";
import SearchBar from "@/components/diy-ui/SearchBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";
import type { Course } from "@/components/diy-ui/SearchBar";
import { Bookmark } from "@mui/icons-material";
import { Button } from "@mui/material";

function SearchPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  const handleCourseSelect = (course: Course | null) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  return (
    <Layout>
      <div>
        <SearchBar onSelectCourse={handleCourseSelect} />
        {selectedCourse && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-[1500px]">
              <Button
                endIcon={<Bookmark />}
                variant="contained"
                className="mb-4"
                color="inherit"
              >
                Bookmark Course
              </Button>
              <div className="p-6">
                <SheetHeader>
                  <SheetTitle>{selectedCourse.moduleCode}</SheetTitle>
                  <SheetDescription>{selectedCourse.title}</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Credits:</strong> {selectedCourse.credits}
                  </p>
                  <p>
                    <strong>Semester:</strong> {selectedCourse.semesterOffered}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedCourse.description}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
