import { createFileRoute } from "@tanstack/react-router";

import { useSession } from "@/lib/auth-client";
import { getAllCoursesQueryOptions } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ul>{data?.map((course) => <li key={course.id}>{course.title}</li>)}</ul>
    </div>
  );
}
