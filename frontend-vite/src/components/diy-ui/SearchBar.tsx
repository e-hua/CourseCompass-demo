import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { X } from "lucide-react";
import { courseMap } from "@/data/CourseMap";

export type Course = {
  moduleCode: string;
  title: string;
  credits: number;
  prerequisites: string[];
  semesterOffered: string;
  description: string;
};

const options = [
    "CP2106",
    "CS2103T",
    "CS2101",
    "MA2108S",
    "CS2102",
    "CS2106",
    "CS2109S",
    "CS3233",
  ];

interface SearchBarProps {
  onSelectCourse: (course: Course | null) => void;
}

export default function SearchBar({onSelectCourse}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => {setQuery(""); onSelectCourse(null);};

  const handleSelect = (option: string) => {
    setQuery(option);
    const course = courseMap[option];
    if (course) {
    onSelectCourse(course);
    }
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
        {query.length > 0 && (
          <CommandList className="absolute z-50 mt-9.25 w-full max-h-60 overflow-auto rounded-md shadow-lg">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <CommandItem key={index} onSelect={() => handleSelect(option)}>
                  {option}
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
};

