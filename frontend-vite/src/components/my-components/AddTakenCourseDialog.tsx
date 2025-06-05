import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { addTakenCourse } from "@/apis/api";

interface AddTakenCourseDialogProps {
  courseCode: string;
}

export function AddTakenCourseDialog({
  courseCode,
}: AddTakenCourseDialogProps) {
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

        <Select onValueChange={setSemesterIndex}>Modify Semester Index</Select>
        <Select onValueChange={setLetterGrade}>Modify Letter Grade</Select>

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
