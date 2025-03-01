import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  RoleType as Role,
  CourseTagType as CourseTag,
  Course,
  Chapter,
  Lesson,
  Progress,
} from "@server/prisma/generated/types/index";

export type CourseWithChapterAndLessonsAndProgress = Course & {
  chapters: (Chapter & {
    lessons: (Lesson & {
      progress: Pick<Progress, "completed">[];
    })[];
  })[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canCreateCourse = (roles: string[]) => {
  return roles.includes("CREATOR" as Role) || roles.includes("ADMIN" as Role);
};

export const courseTagToString = (tag: CourseTag): string => {
  const tagMap: Record<CourseTag, string> = {
    JAVASCRIPT: "JavaScript",
    TYPESCRIPT: "TypeScript",
    REACT: "React",
    NEXTJS: "Next.js",
    NODE: "Node.js",
    PYTHON: "Python",
    JAVA: "Java",
    GOLANG: "Go",
    CSS: "CSS",
    HTML: "HTML",
    DESIGN: "Design",
    DEVOPS: "DevOps",
    DATABASE: "Database",
    MOBILE: "Mobile Development",
    TESTING: "Testing",
    SECURITY: "Security",
    TECHNICAL_WRITING: "Technical Writing",
    MARKETING: "Marketing",
  } as const;
  return tagMap[tag];
};

export const mapCourseTags = (tags: string[]) => {
  return tags.map((tag) => tag.trim() as CourseTag);
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
