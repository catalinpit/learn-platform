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

export const Route = createFileRoute("/courses/$courseId")({
  component: CoursePage,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCourseByIdQueryOptions(params.courseId)
    );
  },
});

function CoursePage() {
  const { courseId } = Route.useParams();

  const { data: course } = useSuspenseQuery(
    getCourseByIdQueryOptions(courseId)
  );

  if ("message" in course) {
    return <div>Error: {course.message}</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto my-8">
      <img
        src={course.coverImage || undefined}
        alt={course.title}
        className="w-full object-cover h-64 rounded-t-xl"
      />

      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
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
  );
}
