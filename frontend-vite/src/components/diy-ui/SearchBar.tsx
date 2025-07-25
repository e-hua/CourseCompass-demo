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
import { fetchModData, type Course } from "@/apis/FetchModDataAPI";

interface SearchBarProps {
  onSelectCourse: (course: Course | null) => void;
}

export default function ModuleSearchBar({ onSelectCourse }: SearchBarProps) {
  const options = useModuleList() ?? [];

  const [query, setQuery] = useState("");

  const filteredOptions = options.filter((option) =>
    option.moduleCode.toLowerCase().includes(query.toLowerCase()) || 
    option.title.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => {
    setQuery("");
    onSelectCourse(null);
  };

  const handleSelect = (moduleCode: string) => {
    setQuery(moduleCode);
    // Use the API call from FetchModDataAPI.ts
    fetchModData(moduleCode).then((course) => onSelectCourse(course));
  };

  return (
    <div className="w-100 p-1 relative">
      <Command className="w-full border rounded shadow">
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
          <CommandList className="absolute z-50 mt-9.25 w-97 max-h-60 overflow-auto rounded-md shadow-lg bg-white dark:bg-neutral-900">
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
