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
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { PaginationWithPerPage } from "@/components/pagination-with-per-page";

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

  return (
    <div className="p-6">
      <div className="pb-6 flex-1">
        <h2 className="text-4xl leading-10">All courses</h2>
        <p className="text-neutral-400 text-lg">
          Browse all the available courses
        </p>
        <Input
          type="search"
          placeholder="Search courses..."
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
          <Card key={course.id} className="flex flex-col max-h-[600px]">
            {course.coverImage && (
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full object-cover h-48 rounded-t-xl"
              />
            )}
            <CardHeader>
              <CardTitle>
                <Link
                  to={`/courses/${course.id}`}
                  params={{ courseId: course.id }}
                >
                  {course.title}
                </Link>
              </CardTitle>
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
      <PaginationWithPerPage page={page} count={count} perPage={perPage} />
    </div>
  );
}
