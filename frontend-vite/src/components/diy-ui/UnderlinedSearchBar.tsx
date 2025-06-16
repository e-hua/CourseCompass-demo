import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export function UnderlinedSearchBar({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 border-b-2 px-2 bg-background focus-within:border-[var(--vite-purple)]",
        className
      )}
    >
      <Search className="size-5 transition-colors group-focus-within:text-[var(--vite-purple)]" />
      <input
        type="text"
        className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
}
