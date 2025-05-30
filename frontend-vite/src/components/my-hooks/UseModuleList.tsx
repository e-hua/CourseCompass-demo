import { useState, useEffect } from "react";

export interface Module {
  moduleCode: string;
  title: string;
  semesters: number[];
}

export default function useModuleList() {
  const [moduleList, setModuleList] = useState<Module[] | null>(null);

  useEffect(() => {
    const list = localStorage.getItem("module_list");
    if (list) {
      setModuleList(JSON.parse(list));
    } else {
      fetch("https://api.nusmods.com/v2/2024-2025/moduleList.json")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("module_list", JSON.stringify(data));
          setModuleList(data);
        })
        .catch((err) => {
          console.error("Unable to fetch the module_list", err);
        });
    }
  }, []);

  return moduleList;
}
