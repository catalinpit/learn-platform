import { createFileRoute } from "@tanstack/react-router";
import { getAllCoursesQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useQuery(getAllCoursesQueryOptions);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="pb-6">
        <h2 className="text-4xl leading-10">All courses</h2>
        <p className="text-neutral-400 text-lg">
          Browse all the available courses
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((course) => (
          <Card key={course.id} className="flex flex-col max-h-[600px]">
            {course.coverImage && (
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full object-cover h-48 rounded-t-xl"
              />
            )}
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
            <CardFooter className="mt-auto">
              <p className="font-semibold">
                {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
