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
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

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
              <div className="max-w-4xl mx-auto p-4 space-y-6">
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
                    <strong>Description:</strong>
                    <div className="text-sm text-muted-foreground">
                      {selectedCourse.description}
                    </div>
                  </p>
                </div>
              </div>
              <Button className="mb-4 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Bookmark Module
              </Button>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
