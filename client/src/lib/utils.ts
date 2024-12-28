import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Role } from "@server/shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canCreateCourse = (roles: string[]) => {
  return roles.includes(Role.CREATOR) || roles.includes(Role.ADMIN);
};
