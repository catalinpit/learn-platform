import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
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

export { Avatar, AvatarImage, AvatarFallback, AvatarWithText };
