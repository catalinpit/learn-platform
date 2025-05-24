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
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { PaginationWithPerPage } from "@/components/pagination-with-per-page";
import { calculateCourseProgress } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getStudentCoursesOptions } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import { CourseHeader } from "@/components/course-header";

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

  const courses = data?.courses;
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
    <div className="flex flex-col">
      <div className="flex-1 p-6">
        <div className="pb-12 flex-1">
          <CourseHeader
            title="My Courses"
            description="Browse all your enrolled courses"
          />
          <Input
            type="search"
            placeholder="Search courses..."
            className="mx-auto w-3/4 sm:w-1/2"
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
            <Card key={course.id} className="flex flex-col h-full">
              {course.coverImage && (
                <CardImage src={course.coverImage} alt={course.title} />
              )}
              <div className="flex flex-col flex-1">
                <CardHeader className="flex-none">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="pt-1">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <div className="flex-1"></div>
                <CardContent className="pt-0">
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
      </div>
      {courses && courses.length > 0 && (
        <PaginationWithPerPage page={page} perPage={perPage} count={count} />
      )}
    </div>
  );
}
