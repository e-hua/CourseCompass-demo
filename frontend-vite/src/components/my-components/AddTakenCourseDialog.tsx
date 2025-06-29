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
import { addTakenCourse } from "@/apis/TakenCourseAPI";
import { useUserProfile } from "../my-hooks/UserProfileContext";
import { toast } from "sonner";

interface AddTakenCourseDialogProps {
  courseCode: string;
  units: number;
}

export function AddTakenCourseDialog({
  courseCode,
  units,
}: AddTakenCourseDialogProps) {
  const { userProfile } = useUserProfile();
  const [semesterIndex, setSemesterIndex] = useState<string>("");
  const [letterGrade, setLetterGrade] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      addTakenCourse({
        courseCode,
        semesterIndex: Number(semesterIndex),
        letterGrade,
        units: units,
      }),
    onSuccess: () => {
      toast.success(`Successfully added ${courseCode}!`);

      queryClient.invalidateQueries({ queryKey: ["takenCourses"] });
    },
    onError: () => {
      toast.error("Failed to add taken course");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add to taken courses</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {courseCode} to taken courses</DialogTitle>
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
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
