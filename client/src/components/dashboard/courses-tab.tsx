import { getCreatorCoursesOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationWithPerPage } from "@/components/pagination-with-per-page";
import { Pencil } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useSearch } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Courses() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });
  const { search, page = 1, perPage = 10 } = searchParams;
  const debouncedSearch = useDebouncedValue(search, 500);

  const { data, isPending } = useQuery(
    getCreatorCoursesOptions({
      query: debouncedSearch,
      page: page,
      perPage: perPage,
    })
  );
  const courses = data?.courses;
  const totalPages = data?.totalPages;

  const handleNavigateToEdit = (courseId: string) => {
    navigate({ to: "/creator/$courseId/edit", params: { courseId } });
  };

  if (isPending) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-8">Your Courses</h2>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Your Courses ({courses?.length})
          </h2>
          <Input
            type="search"
            placeholder="Search your courses..."
            className="max-w-md mt-4"
            value={search}
            onChange={(e) => {
              navigate({
                to: "/creator/dashboard",
                search: (prev) => ({
                  ...prev,
                  page: 1,
                  search: e.target.value,
                }),
              });
            }}
          />
        </div>

        {courses?.length === 0 ? (
          <p>You haven't created any courses yet.</p>
        ) : (
          <>
            <div className="grid gap-4">
              {courses?.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <h3
                        onClick={() => handleNavigateToEdit(course.id)}
                        className="font-semibold hover:text-primary/70 cursor-pointer"
                      >
                        {course.title}
                      </h3>
                      <Badge
                        variant={course.isPublished ? "default" : "destructive"}
                        className={cn("w-fit", {
                          "bg-green-500 hover:bg-green-500 text-white outline outline-1 outline-green-400/50":
                            course.isPublished,
                          "bg-red-500 hover:bg-red-500 text-white outline outline-1 outline-red-400/50":
                            !course.isPublished,
                        })}
                      >
                        {course.isPublished ? "Published" : "Unpublished"}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNavigateToEdit(course.id)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
            <PaginationWithPerPage
              page={page}
              count={totalPages}
              perPage={perPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
