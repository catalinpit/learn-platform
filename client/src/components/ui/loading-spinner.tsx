import { Loader, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IProps extends LucideProps {
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({
  className,
  text,
  fullScreen = false,
  ...props
}: IProps) => {
  const spinner = (
    <Loader className={cn("animate-spin h-12 w-12", className)} {...props} />
  );

  if (!fullScreen) {
    return spinner;
  }

  return (
    <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {spinner}
        {text && <p className="text-foreground text-2xl font-medium">{text}</p>}
      </div>
    </div>
  );
};
