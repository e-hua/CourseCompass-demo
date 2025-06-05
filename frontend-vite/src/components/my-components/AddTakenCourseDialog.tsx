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
import { useMutation } from "@tanstack/react-query";
import { addTakenCourse } from "@/apis/api";
import { useUserProfile } from "../my-hooks/UserProfileContext";

interface AddTakenCourseDialogProps {
  courseCode: string;
}

export function AddTakenCourseDialog({
  courseCode,
}: AddTakenCourseDialogProps) {
  const { userProfile } = useUserProfile();
  const [semesterIndex, setSemesterIndex] = useState<string>("");
  const [letterGrade, setLetterGrade] = useState<string>("");

  const mutation = useMutation({
    mutationFn: () =>
      addTakenCourse({
        courseCode,
        semesterIndex: Number(semesterIndex),
        letterGrade,
      }),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {courseCode}</DialogTitle>
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
