import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

function Tag({ className, isActive, ...props }: TagProps) {
  return (
    <div
      className={cn(
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-200 h-6 px-3 py-1.5 relative inline-flex items-center text-sm font-medium leading-5 rounded-full shadow-[0_0_0_1px_rgba(99,102,241,0.15)_inset,0_1px_1px_rgba(99,102,241,0.1)_inset,0_-1px_1px_rgba(99,102,241,0.1)_inset,0_2px_4px_rgba(99,102,241,0.15)] dark:shadow-[0_0_0_1px_rgba(99,102,241,0.15)_inset,0_1px_1px_rgba(99,102,241,0.2)_inset,0_-1px_1px_rgba(99,102,241,0.2)_inset,0_1px_2px_rgba(99,102,241,0.3)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.2)_inset,0_1.5px_1.5px_rgba(99,102,241,0.15)_inset,0_-1.5px_1.5px_rgba(99,102,241,0.15)_inset,0_3px_6px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_0_0_1px_rgba(99,102,241,0.2)_inset,0_1.5px_1.5px_rgba(99,102,241,0.25)_inset,0_-1.5px_1.5px_rgba(99,102,241,0.25)_inset,0_2px_3px_rgba(99,102,241,0.4)] hover:bg-indigo-200 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150",
        isActive
          ? "bg-indigo-600 dark:bg-indigo-700 text-white hover:text-white hover:bg-indigo-700 dark:hover:bg-indigo-800"
          : "",
        className
      )}
      {...props}
    />
  );
}

export { Tag };
