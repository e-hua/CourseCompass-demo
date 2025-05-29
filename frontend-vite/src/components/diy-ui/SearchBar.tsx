import React, { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { X } from "lucide-react";
import CourseInfoCard from "@/components/my-components/CourseInfoCard";
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

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => {setQuery(""); setSelectedCourse(null);};

  const handleSelect = (option: string) => {
    setQuery(option);
    const course = courseMap[option];
    if (course) {
    setSelectedCourse(course);
    }
  };

  return (
    <div className="w-80 relative">
      <Command className="w-full">
        <CommandInput
          placeholder="Search..."
          value={query}
          onValueChange={(value: string) => setQuery(value)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-2"
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

        {selectedCourse && (
        <CourseInfoCard course={selectedCourse}/>
      )}
      </Command>
    </div>
  );
};

export default SearchBar;
