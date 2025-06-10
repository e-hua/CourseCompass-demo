export type SemesterData = {
  semester: number;
  examDate?: string;
  examDuration?: number;
};

export type Course = {
  moduleCode: string;
  title: string;
  description: string;
  credits: number;
  department: string;
  faculty: string;
  workload: string;
  prerequisite?: string;
  preclusion?: string;
  corequisite?: string;
  semesterData: SemesterData[];
};

export async function fetchModData(moduleCode: string) {
  const res = await fetch(
    "https://api.nusmods.com/v2/2024-2025/modules/" + moduleCode + ".json"
  );

  const data = await res.json();

  const course: Course = {
    moduleCode: data.moduleCode,
    title: data.title,
    description: data.description,
    credits: parseInt(data.moduleCredit),
    department: data.department,
    faculty: data.faculty,
    workload: data.workload,
    prerequisite: data.prerequisite,
    preclusion: data.preclusion,
    corequisite: data.corequisite,
    semesterData: data.semesterData ?? [],
  };

  return course;
}
