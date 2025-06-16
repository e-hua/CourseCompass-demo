import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CoursePreviewSorter {
  sortBy?: string;
  descending?: boolean;
}

interface SorterPopoverProps {
  sorter: CoursePreviewSorter;
  onChange: (updated: CoursePreviewSorter) => void;
}

export function SorterPopover({ sorter, onChange }: SorterPopoverProps) {
  const [localSorter, setLocalSorter] = useState(sorter);

  const isSorterActive = (sorter: CoursePreviewSorter) => {
    return !!sorter.sortBy;
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className={isSorterActive(sorter) ? "text-[var(--vite-purple)]" : ""}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </PopoverTrigger>

      <PopoverContent className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Sort by</label>
          <Select
            value={
              !!localSorter.sortBy && localSorter.sortBy !== "None"
                ? localSorter.sortBy
                : "None"
            }
            onValueChange={(value) =>
              setLocalSorter({
                ...localSorter,
                sortBy: value === "None" ? "" : value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="averageWorkload">Workload</SelectItem>
              <SelectItem value="averageEnjoyability">Enjoyability</SelectItem>
              <SelectItem value="rating counts">Rating counts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Order</label>
          <Select
            value={localSorter.descending ? "descending" : "ascending"}
            onValueChange={(value) =>
              setLocalSorter({
                ...localSorter,
                descending: value === "descending",
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ascending">Ascending</SelectItem>
              <SelectItem value="descending">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setLocalSorter({ sortBy: "", descending: false });
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              onChange(localSorter);
            }}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
