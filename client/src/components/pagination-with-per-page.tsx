import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Route } from "@/routes";

export type PaginationWithPerPageProps = {
  page: number;
  count?: number;
  perPage: number;
};

export function PaginationWithPerPage({
  page,
  count,
  perPage,
}: PaginationWithPerPageProps) {
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <Pagination className="pt-10 pb-4 sm:py-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              search={(prev) => ({
                ...prev,
                page: page - 1,
              })}
              disabled={page === 1}
            />
          </PaginationItem>
          {Array.from({ length: count ?? 1 }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                isActive={page === index + 1}
                search={(prev) => ({
                  ...prev,
                  page: index + 1,
                })}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              search={(prev) => ({
                ...prev,
                page: page + 1,
              })}
              disabled={page === (count ?? 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex flex-row items-center gap-4">
        <span className="whitespace-nowrap text-sm">Courses per page</span>

        <Select
          value={String(perPage)}
          onValueChange={(value) => {
            navigate({
              search: (prev) => ({
                ...prev,
                page: 1,
                perPage: Number(value),
              }),
            });
          }}
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
  );
}
