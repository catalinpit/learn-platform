import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Role, CourseTag } from "@server/shared/types";
import type { CourseWithChapterAndLessonsAndProgress } from "@server/shared/types";

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

export const calculateCourseProgress = (
  course: CourseWithChapterAndLessonsAndProgress
) => {
  const totalLessons = course.chapters.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  );

  const completedLessons = course.chapters.reduce((total, chapter) => {
    return (
      total +
      chapter.lessons.filter((lesson) =>
        lesson.progress.some((p) => p.completed)
      ).length
    );
  }, 0);

  return totalLessons === 0
    ? 0
    : Math.round((completedLessons / totalLessons) * 100);
};

export function convertDatesToDateObjects<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const result = Array.isArray(obj) ? [...obj] : { ...obj };

  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const value = result[key];

      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
        (result as any)[key] = new Date(value);
      } else if (typeof value === "object") {
        result[key] = convertDatesToDateObjects(value);
      }
    }
  }

  return result;
}
