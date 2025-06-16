import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CoursePreviewFilter {
  faculty?: string;
  su?: boolean;
  semesters?: number[];
}

interface FilterPopoverProps {
  filter: CoursePreviewFilter;
  onChange: (updated: CoursePreviewFilter) => void;
}

export function FilterPopover({ filter, onChange }: FilterPopoverProps) {
  const [localFilter, setLocalFilter] = useState(filter);
  const isFilterActive = (filter: CoursePreviewFilter) => {
    return filter.su || filter.faculty || filter.semesters?.length !== 2;
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className={isFilterActive(filter) ? "text-[var(--vite-purple)]" : ""}
        >
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Faculty</label>
          <Select
            value={localFilter.faculty ?? "All"}
            onValueChange={(value) =>
              setLocalFilter({
                ...localFilter,
                faculty: value === "All" ? "" : value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Computing">Computing</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="su-checkbox"
            checked={localFilter.su ?? false}
            onCheckedChange={(checked) =>
              setLocalFilter({ ...localFilter, su: Boolean(checked) })
            }
          />
          <label
            htmlFor="su-checkbox"
            className="text-sm font-medium leading-none"
          >
            Only show SU-eligible
          </label>
        </div>

        <div>
          <label className="text-sm font-medium">Semesters</label>
          <div className="flex gap-2 mt-1">
            {[1, 2].map((sem) => {
              const selected = localFilter.semesters?.includes(sem);
              return (
                <Button
                  key={sem}
                  variant={selected ? "default" : "outline"}
                  onClick={() => {
                    const current = localFilter.semesters ?? [];
                    const next = current.includes(sem)
                      ? current.filter((s) => s !== sem)
                      : [...current, sem];
                    setLocalFilter({ ...localFilter, semesters: next });
                  }}
                >
                  Sem {sem}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setLocalFilter({ semesters: [1, 2] });
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              onChange(localFilter);
            }}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
