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
import { Link } from "@tanstack/react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
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
          onChange={(e) => setSearch(e.target.value)}
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
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <Pagination className="pt-10 pb-4 sm:py-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({ length: count ?? 1 }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  isActive={page === index + 1}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === (count ?? 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex flex-row items-center gap-4">
          <span className="whitespace-nowrap text-sm">Courses per page</span>

          <Select
            value={String(perPage)}
            onValueChange={(value) => setPerPage(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select page size">
                {String(perPage)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 10, 15, 20, 25].map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
