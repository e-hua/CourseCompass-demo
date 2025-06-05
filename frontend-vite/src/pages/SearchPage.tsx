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
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import { AddTakenCourseDialog } from "@/components/my-components/AddTakenCourseDialog";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTakenCourse } from "@/apis/api";
import { toast } from "sonner";

function SearchPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  const handleCourseSelect = (course: Course | null) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const { userProfile, toggleBookmark } = useUserProfile();
  const isBookmarked = userProfile?.bookmarkedCourseIds.includes(
    selectedCourse?.moduleCode ?? "a"
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
                  <div>
                    <strong>Description:</strong>
                    <div className="text-sm text-muted-foreground">
                      {selectedCourse.description}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => toggleBookmark(selectedCourse.moduleCode)}
                className="flex gap-2 items-center"
              >
                {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
              </Button>
              {takenCourses?.some(
                (tc) => tc.courseCode === selectedCourse.moduleCode
              ) ? (
                <Button
                  variant={"destructive"}
                  onClick={() =>
                    handleDelete.mutate(
                      takenCourses.filter(
                        (tc) => tc.courseCode === selectedCourse.moduleCode
                      )[0].id
                    )
                  }
                >
                  Remove {selectedCourse.moduleCode} from taken Courses
                </Button>
              ) : (
                <AddTakenCourseDialog courseCode={selectedCourse.moduleCode} />
              )}
            </SheetContent>
          </Sheet>
        )}
      </div>
    </Layout>
  );
}

export default SearchPage;
