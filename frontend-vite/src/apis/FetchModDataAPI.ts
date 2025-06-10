export type Course = {
  moduleCode: string;
  title: string;
  credits: number;
  semesterOffered: string;
  description: string;
};

type SemesterData = {
  semester: string;
};

export async function fetchModData(moduleCode: string) {
  const res = await fetch(
    "https://api.nusmods.com/v2/2024-2025/modules/" + moduleCode + ".json"
  );

  const data = await res.json();

  const course: Course = {
    moduleCode: data.moduleCode,
    title: data.title,
    credits: parseInt(data.moduleCredit),
    semesterOffered: data.semesterData
      .map((s: SemesterData) => "Sem " + s.semester)
      .join(", "),
    description: data.description,
  };

  return course;
}
