import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTakenCourse, type TakenCourse } from "@/apis/TakenCourseAPI";
import { useUserProfile } from "../my-hooks/UserProfileContext";
import { toast } from "sonner";

export function UpdateTakenCourseDialog({
  takenCourse,
}: {
  takenCourse: TakenCourse;
}) {
  const { userProfile } = useUserProfile();
  const [semesterIndex, setSemesterIndex] = useState<string>(
    takenCourse.semesterIndex.toString()
  );
  const [letterGrade, setLetterGrade] = useState<string>(
    takenCourse.letterGrade
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      updateTakenCourse({
        id: takenCourse.id,
        semesterIndex: Number(semesterIndex),
        letterGrade: letterGrade,
        units: takenCourse.units,
        courseCode: takenCourse.courseCode,
      }),
    onSuccess: () => {
      toast.success("Successfully updated " + takenCourse.courseCode + " !");

      queryClient.invalidateQueries({ queryKey: ["takenCourses"] });
    },
    onError: () => {
      toast.error("Failed to update taken course");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update {takenCourse.courseCode}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update {takenCourse.courseCode}</DialogTitle>
        </DialogHeader>

        <Select onValueChange={setSemesterIndex} value={semesterIndex}>
          <SelectTrigger>
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: userProfile?.currentSemesterIndex ?? 0 })
              .map((_, i) => i + 1)
              .map((index) => {
                const year = Math.floor((index - 1) / 2) + 1;
                const sem = index % 2 === 1 ? 1 : 2;
                return (
                  <SelectItem key={index} value={String(index)}>
                    {`Y${year}S${sem}`}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>

        <Select onValueChange={setLetterGrade} value={letterGrade}>
          <SelectTrigger>
            <SelectValue placeholder="Select letter grade" />
          </SelectTrigger>
          <SelectContent>
            {[
              "A+",
              "A",
              "A-",
              "B+",
              "B",
              "B-",
              "C+",
              "C",
              "D+",
              "D",
              "F",
              "S",
              "U",
            ].map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => mutation.mutate()}
          disabled={!semesterIndex || !letterGrade || mutation.isPending}
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
