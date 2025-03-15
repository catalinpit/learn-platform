import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = (
  {
    ref,
    className,
    value,
    completed,
    ...props
  }
) => (<ProgressPrimitive.Root
  ref={ref}
  className={cn(
    "relative h-2 w-full overflow-hidden rounded-full",
    completed ? "bg-green-100 dark:bg-green-900/20" : "bg-primary/20",
    className
  )}
  {...props}
>
  <ProgressPrimitive.Indicator
    className={cn(
      "h-full w-full flex-1 transition-all",
      completed ? "bg-green-500" : "bg-primary"
    )}
    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
  />
</ProgressPrimitive.Root>);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
