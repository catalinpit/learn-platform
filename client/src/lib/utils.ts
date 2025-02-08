import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Role, CourseTag } from "@server/shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canCreateCourse = (roles: string[]) => {
  return roles.includes(Role.CREATOR) || roles.includes(Role.ADMIN);
};

export const courseTagToString = (tag: CourseTag): string => {
  const tagMap: Record<CourseTag, string> = {
    [CourseTag.JAVASCRIPT]: "JavaScript",
    [CourseTag.TYPESCRIPT]: "TypeScript",
    [CourseTag.REACT]: "React",
    [CourseTag.NEXTJS]: "Next.js",
    [CourseTag.NODE]: "Node.js",
    [CourseTag.PYTHON]: "Python",
    [CourseTag.JAVA]: "Java",
    [CourseTag.GOLANG]: "Go",
    [CourseTag.CSS]: "CSS",
    [CourseTag.HTML]: "HTML",
    [CourseTag.DESIGN]: "Design",
    [CourseTag.DEVOPS]: "DevOps",
    [CourseTag.DATABASE]: "Database",
    [CourseTag.MOBILE]: "Mobile Development",
    [CourseTag.TESTING]: "Testing",
    [CourseTag.SECURITY]: "Security",
    [CourseTag.TECHNICAL_WRITING]: "Technical Writing",
    [CourseTag.MARKETING]: "Marketing",
  };
  return tagMap[tag];
};

export const mapCourseTags = (tags: string[]) => {
  return tags.map((tag) => tag.trim()) as CourseTag[];
};
