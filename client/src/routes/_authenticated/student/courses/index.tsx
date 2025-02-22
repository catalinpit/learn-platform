import {
  createFileRoute,
  useNavigate,
  stripSearchParams,
} from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { PaginationWithPerPage } from "@/components/pagination-with-per-page";
import {
  calculateCourseProgress,
  convertDatesToDateObjects,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getStudentCoursesOptions } from "@/lib/api";
import { Progress } from "@/components/ui/progress";

export type EnrolledCoursesRouteParams = {
  search: string;
  page: number;
  perPage: number;
};

const EnrolledCoursesRouteParamsDefaultValues = {
  search: "",
  page: 1,
  perPage: 10,
};

export const Route = createFileRoute("/_authenticated/student/courses/")({
  component: RouteComponent,
  validateSearch: (search: {
    search?: string;
    page?: number;
    perPage?: number;
  }): EnrolledCoursesRouteParams => {
    return {
      search: String(search.search || ""),
      page: Number(search.page) || 1,
      perPage: Number(search.perPage) || 10,
    };
  },
  search: {
    middlewares: [stripSearchParams(EnrolledCoursesRouteParamsDefaultValues)],
  },
});

function RouteComponent() {
  const { page, perPage, search } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const debouncedSearch = useDebouncedValue(search, 500);

  const { isPending, error, data } = useQuery(
    getStudentCoursesOptions({
      query: debouncedSearch,
      page,
      perPage,
    })
  );

  const courses = convertDatesToDateObjects(data?.courses);
  const count = data?.totalPages;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!courses?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">No courses found</h1>
        <p className="text-gray-500">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="pb-6 flex-1">
        <h2 className="text-4xl leading-10">My Courses</h2>
        <p className="text-neutral-400 text-lg">
          Browse all your enrolled courses
        </p>
        <Input
          type="search"
          placeholder="Search your courses..."
          className="mt-4 w-1/3"
          value={search}
          onChange={(e) => {
            navigate({
              search: (prev) => ({ ...prev, page: 1, search: e.target.value }),
            });
          }}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {courses?.map((course) => (
          <Card key={course.id} className="flex flex-col">
            {course.coverImage && (
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="flex flex-col flex-1">
              <CardHeader className="flex-none">
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="pt-1">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sm font-medium">
                      {Math.round(calculateCourseProgress(course))}%
                    </span>
                  </div>
                  <Progress
                    value={calculateCourseProgress(course)}
                    completed={calculateCourseProgress(course) === 100}
                    className="w-full"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  to="/student/courses/$courseId"
                  params={{ courseId: course.id }}
                  className="text-primary hover:underline"
                >
                  Continue Learning →
                </Link>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <PaginationWithPerPage page={page} perPage={perPage} count={count} />
      </div>
    </div>
  );
}
