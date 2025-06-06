import type { TakenCourse } from "@/apis/TakenCourseAPI";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";

export type DataPointOnChart = {
  Semester: string;
  SGPA: number;
};

function formatSemester(index: number): string {
  const year = Math.floor((index - 1) / 2) + 1;
  const sem = index % 2 === 1 ? 1 : 2;
  return "Y" + year + "S" + sem;
}

const gradeToPoint: Record<string, number> = {
  "A+": 5.0,
  A: 5.0,
  "A-": 4.5,
  "B+": 4.0,
  B: 3.5,
  "B-": 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0.0,
};

export function computeChartData(courses: TakenCourse[]): DataPointOnChart[] {
  const { userProfile } = useUserProfile();
  const currentSemIndex = userProfile?.currentSemesterIndex;
  const semesterIndexMap = new Map<number, TakenCourse[]>();

  for (let semIndex = 1; semIndex <= (currentSemIndex ?? 1); semIndex++) {
    semesterIndexMap.set(semIndex, []);
  }

  for (const course of courses) {
    const semIndex = course.semesterIndex;
    if (semIndex <= (currentSemIndex ?? 1)) {
      if (!semesterIndexMap.has(semIndex)) {
        semesterIndexMap.set(semIndex, []);
      }
      semesterIndexMap.get(semIndex)!.push(course);
    }
  }

  const sorted = Array.from(semesterIndexMap.entries()).sort(
    ([a], [b]) => a - b
  );

  return sorted.map(([semesterIndex, courseList]) => {
    let totalUnits = 0;
    let weightedPoints = 0;

    for (const course of courseList) {
      const points = gradeToPoint[course.letterGrade];
      if (points !== undefined) {
        const units = course.units;
        weightedPoints += points * units;
        totalUnits += units;
      }
    }

    const sgpa = totalUnits > 0 ? weightedPoints / totalUnits : 5;

    return {
      Semester:
        formatSemester(semesterIndex) +
        "\n" +
        courseList.map((c) => `${c.courseCode} – ${c.letterGrade}`).join("\n"),
      SGPA: parseFloat(sgpa.toFixed(2)),
    };
  });
}
