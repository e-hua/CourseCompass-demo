import type { Course } from "@/components/diy-ui/SearchBar";

// This file defines a mapping of course codes to course details.
// Note that this version for courseMap is only for demonstration purposes, and should be replaced in the future.

export const courseMap: Record<string, Course> = {
  CS2103T: {
    moduleCode: "CS2103T",
    title: "Software Engineering",
    credits: 4,
    prerequisites: ["CS2030S"],
    semesterOffered: "Sem 1",
    description: "Covers software design, testing, and team collaboration.",
  },
  CS2101: {
    moduleCode: "CS2101",
    title: "Effective Communication for Computing Professionals",
    credits: 4,
    prerequisites: [],
    semesterOffered: "Sem 1",
    description: "Focuses on communication skills in a computing context.",
 },
}