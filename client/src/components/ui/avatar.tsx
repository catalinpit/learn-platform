import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    ref: React.RefObject<React.ElementRef<typeof AvatarPrimitive.Root>>;
  }
) => (<AvatarPrimitive.Root
  ref={ref}
  className={cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    className
  )}
  {...props}
/>);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    ref: React.RefObject<React.ElementRef<typeof AvatarPrimitive.Image>>;
  }
) => (<AvatarPrimitive.Image
  ref={ref}
  className={cn("aspect-square h-full w-full", className)}
  {...props}
/>);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = (
  {
    ref,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    ref: React.RefObject<React.ElementRef<typeof AvatarPrimitive.Fallback>>;
  }
) => (<AvatarPrimitive.Fallback
  ref={ref}
  className={cn(
    "flex h-full w-full items-center justify-center rounded-full bg-muted",
    className
  )}
  {...props}
/>);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarWithTextProps {
  avatarClass?: string;
  avatarSrc?: string | null;
  avatarFallback: string;
  className?: string;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  // Optional class to hide/show the text beside avatar
  textSectionClassName?: string;
}

function AvatarWithText({
  avatarClass,
  avatarSrc,
  avatarFallback,
  className,
  primaryText,
  secondaryText,
  textSectionClassName,
}: AvatarWithTextProps) {
  return (
    <div className={cn("flex w-full max-w-xs items-center gap-2", className)}>
      <Avatar
        className={cn(
          "dark:border-border h-10 w-10 border-2 border-solid border-white",
          avatarClass
        )}
      >
        {avatarSrc && <AvatarImage src={avatarSrc} />}
        <AvatarFallback className="text-xs text-gray-400">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col truncate text-left text-sm font-normal",
          textSectionClassName
        )}
      >
        <span className="text-foreground truncate">{primaryText}</span>
        <span className="text-muted-foreground truncate text-xs">
          {secondaryText}
        </span>
      </div>
    </div>
  );
}

export { Avatar, AvatarFallback, AvatarImage, AvatarWithText };
