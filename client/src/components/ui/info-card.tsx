import { InfoIcon } from "lucide-react";
import { Card, CardHeader, CardDescription } from "./card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  title: string;
  description?: ReactNode;
  className?: string;
  variant?: "warning" | "success";
};

export function InfoCard({
  title,
  description,
  className = "",
  variant = "warning",
}: InfoCardProps) {
  const variantStyles = {
    warning: "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/50",
    success: "border-green-300 bg-green-50 dark:bg-green-900/50",
  };

  const iconStyles = {
    warning: "text-yellow-500 dark:text-yellow-400",
    success: "text-green-500 dark:text-green-400",
  };

  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardHeader className="p-5 gap-0">
        <div className="flex items-center gap-2">
          <InfoIcon className={cn("h-5 w-5", iconStyles[variant])} />

          <CardDescription
            className={cn("text-sm font-medium", iconStyles[variant])}
          >
            {title}
          </CardDescription>
        </div>
        {description && (
          <CardDescription className="mt-2 text-sm text-muted-foreground dark:text-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
