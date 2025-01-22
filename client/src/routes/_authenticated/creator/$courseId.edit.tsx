import { getCourseByIdQueryOptions } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/creator/$courseId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCourseByIdQueryOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const { courseId } = Route.useParams();

  const { data: course } = useSuspenseQuery(
    getCourseByIdQueryOptions(courseId)
  );

  if ("message" in course) {
    return <div>Error: {course.message}</div>;
  }

  return (
    <>
      {!course.isPublished ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 mx-auto w-1/2 rounded-lg">
          This course is not published yet. Only you can see it.
        </div>
      ) : null}

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
            <div className="prose dark:prose-headings:text-white dark:text-white">
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
      </Card>
    </>
  );
}
