import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "from-primary to-primary/85 text-primary-foreground dark:inset-shadow-2xs dark:inset-shadow-white/10 bg-linear-to-t border border-b-2 border-neutral-950/40 shadow-xs shadow-neutral-950/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-115 active:brightness-90 dark:border-x-0 dark:border-t-0 dark:border-neutral-950/50 dark:ring-white/5",
        destructive:
          "from-destructive/85 to-destructive text-destructive-background dark:text-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-destructive/75 dark:bg-linear-to-t border border-neutral-950/35 shadow-xs shadow-neutral-950/20 ring-0 transition-[filter] duration-200 hover:brightness-120 active:brightness-95 dark:border-0 dark:border-neutral-950/50",
        outline:
          "bg-background text-foreground shadow-sm hover:brightness-115 active:brightness-90 inset-shadow-[0_1px_rgb(255_255_255/0.15)] transition-all border",
        secondary:
          "bg-radial-[at_52%_-52%] **:[text-shadow:0_1px_0_var(--color-primary)] border-primary from-primary/70 to-primary/95 text-primary-foreground inset-shadow-2xs inset-shadow-white/25 dark:inset-shadow-white dark:from-primary dark:to-primary/70 dark:hover:to-primary border text-sm shadow-md shadow-neutral-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:border-0",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
