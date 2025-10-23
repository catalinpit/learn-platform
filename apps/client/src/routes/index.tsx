import {
  createFileRoute,
  useNavigate,
  stripSearchParams,
} from "@tanstack/react-router";
import { getAllCoursesQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { PaginationWithPerPage } from "@/components/pagination-with-per-page";
import { courseTagToString } from "@/lib/utils";
import { Tag } from "@/components/ui/card-tag";
import { CourseHeader } from "@/components/course-header";

export type IndexRouteParams = {
  search: string;
  page: number;
  perPage: number;
};

const IndexRouteParamsDefaultValues = {
  search: "",
  page: 1,
  perPage: 10,
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: {
    search?: string;
    page?: number;
    perPage?: number;
  }): IndexRouteParams => {
    return {
      search: String(search.search || ""),
      page: Number(search.page) || 1,
      perPage: Number(search.perPage) || 10,
    };
  },
  search: {
    middlewares: [stripSearchParams(IndexRouteParamsDefaultValues)],
  },
});

function Index() {
  const { page, perPage, search } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const debouncedSearch = useDebouncedValue(search, 500);

  const { isPending, error, data } = useQuery(
    getAllCoursesQueryOptions({
      query: debouncedSearch,
      page,
      perPage,
    }),
  );

  const courses = data?.courses;
  const count = data?.totalPages;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-6">
        <div className="pb-12 flex-1">
          <CourseHeader
            title="All courses"
            description="Browse all the available courses and learn something new"
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
                <CardHeader>
                  <CardTitle>
                    <Link
                      to="/courses/$courseId"
                      params={{ courseId: course.id }}
                    >
                      {course.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {course.description.substring(0, 150)}...
                  </CardDescription>
                </CardHeader>
                <div className="flex-1"></div>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 pt-5">
                    {course.tags.map((tag) => (
                      <Tag key={tag}>{courseTagToString(tag)}</Tag>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <p className="font-semibold">
                    {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
                  </p>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {courses && courses.length > 0 && (
        <PaginationWithPerPage page={page} count={count} perPage={perPage} />
      )}
    </div>
  );
}
