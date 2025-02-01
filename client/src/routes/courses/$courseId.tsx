import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourseByIdQueryOptions } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CourseChapterList } from "@/components/course-chapters/course-chapter-list";

export const Route = createFileRoute("/courses/$courseId")({
  component: CoursePage,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCourseByIdQueryOptions(params.courseId)
    );
  },
});

export function CoursePage() {
  const { courseId } = Route.useParams();
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const { data: course } = useSuspenseQuery(
    getCourseByIdQueryOptions(courseId)
  );

  if ("message" in course) {
    return <div>Error: {course.message}</div>;
  }

  const handleLessonClick = (lessonId: string, isFree: boolean) => {
    if (!isFree) {
      return;
    }

    setExpandedLessonId(expandedLessonId === lessonId ? null : lessonId);
  };

  return (
    <>
      <Card className="mx-8 my-8">
        <img
          src={course.coverImage || undefined}
          alt={course.title}
          className="w-full object-cover h-64 rounded-t-xl"
        />

        <CardHeader>
          <CardTitle className="text-5xl py-4 font-base">
            {course.title}
          </CardTitle>
          <CardDescription>
            <div className="prose dark:prose-headings:text-white dark:text-white dark:prose-strong:text-white">
              {/* TODO: FIX THIS ASAP */}
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 rounded-full text-sm dark:bg-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <p className="font-semibold">
            {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
          </p>
        </CardFooter>
      </Card>

      <div className="my-8 mx-8 space-y-6">
        <CourseChapterList
          chapters={course.chapters}
          isEditing={false}
          expandedLessonId={expandedLessonId}
          onLessonClick={handleLessonClick}
        />
      </div>
    </>
  );
}
