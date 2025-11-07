import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

function Tag({ className, ...props }: TagProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center p-1 rounded-lg text-xs from-neutral-100 to-neutral-100/50 bg-gradient-to-t dark:from-neutral-700/70 dark:to-neutral-800/50 text-neutral-600 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 shadow-sm dark:shadow-[0_2px_4px_rgba(0,0,0,0.2)]",
        className
      )}
      {...props}
    />
  );
}

export { Tag };
