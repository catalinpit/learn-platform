import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourseByIdQueryOptions } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CourseChapterList } from "@/components/course-chapters/course-chapter-list";
import { courseTagToString } from "@/lib/utils";
import NotFound from "@/components/not-found";
import { useSession } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { Tag } from "@/components/ui/card-tag";
import { useMutation } from "@tanstack/react-query";
import { createCheckout } from "@/lib/api";

export const Route = createFileRoute("/courses/$courseId")({
  component: CoursePage,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCourseByIdQueryOptions(params.courseId),
    );
  },
});

export function CoursePage() {
  const { courseId } = Route.useParams();
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const { data: course } = useSuspenseQuery(
    getCourseByIdQueryOptions(courseId),
  );

  const { mutateAsync: checkout } = useMutation({
    mutationFn: (productId: string) => {
      return createCheckout({ productId });
    },
  });

  const handleCheckout = async () => {
    if (!session.data) {
      navigate({
        to: "/login",
      });
      return;
    }

    if ("message" in course) {
      return;
    }

    try {
      if (!course.productId) {
        console.error('No product ID found for course');
        
        return;
      }

      const res = await checkout(course.productId);
      
      window.location.href = res.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const session = useSession();
  const navigate = useNavigate();

  if ("message" in course) {
    return <NotFound />;
  }

  const handleLessonClick = (lessonId: string, isFree: boolean) => {
    if (!isFree) {
      return;
    }

    setExpandedLessonId(expandedLessonId === lessonId ? null : lessonId);
  };

  const tags = course.tags.map((tag) => courseTagToString(tag));

  return (
    <>
      <Card className="mx-8 my-8">
        <img
          src={course.coverImage || undefined}
          alt={course.title}
          className="w-full object-cover h-64 rounded-t-xl"
        />

        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-4xl md:py-4 font-base">
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
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <p className="font-semibold">
            {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
          </p>
          {course.price > 0 && (
            <Button
              onClick={handleCheckout}
            >
              Enroll Now
            </Button>
          )}
          {course.price === 0 && (
            <Button
              onClick={() => {
                // For free courses, we can directly grant access or show content
                setExpandedLessonId(course.chapters[0]?.lessons[0]?.id || null);
              }}
            >
              Start Learning
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="my-8 mx-8 space-y-6">
        <CourseChapterList
          chapters={course.chapters}
          courseId={courseId}
          isEditing={false}
          expandedLessonId={expandedLessonId}
          onLessonClick={handleLessonClick}
        />
      </div>
    </>
  );
}
