import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { X } from "lucide-react";
import useModuleList from "../my-hooks/UseModuleList";

export type Course = {
  moduleCode: string;
  title: string;
  credits: number;
  semesterOffered: string;
  description: string;
};

interface SearchBarProps {
  onSelectCourse: (course: Course | null) => void;
}

export default function ModuleSearchBar({ onSelectCourse }: SearchBarProps) {
  const options = useModuleList() ?? [];

  const [query, setQuery] = useState("");

  const filteredOptions = options.filter((option) =>
    option.moduleCode.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => {
    setQuery("");
    onSelectCourse(null);
  };

  const handleSelect = (moduleCode: string) => {
    setQuery(moduleCode);
    console.log(moduleCode);
    fetch(
      "https://api.nusmods.com/v2/2024-2025/modules/" + moduleCode + ".json"
    )
      .then((res) => res.json())
      .then((data) => {
        const course: Course = {
          moduleCode: data.moduleCode,
          title: data.title,
          credits: parseInt(data.moduleCredit),
          semesterOffered: data.semesterData
            .map((s) => "Sem " + s.semester)
            .join(", "),
          description: data.description,
        };
        onSelectCourse(course);
      });
  };

  return (
    <div className="w-100 p-1 relative">
      <Command className="w-full bg-white dark:bg-slate-800 border rounded shadow">
        <CommandInput
          placeholder="Search..."
          value={query}
          onValueChange={(value: string) => setQuery(value)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute left-90 bottom-2.5 bg-transparent hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {query.length > 1 && (
          <CommandList className="absolute z-50 mt-9.25 w-full max-h-60 overflow-auto rounded-md shadow-lg">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelect(option.moduleCode)}
                >
                  {option.moduleCode + " " + option.title}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
