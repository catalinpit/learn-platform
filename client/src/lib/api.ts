import { hc } from "hono/client";
import type { AppType } from "@server/shared/types";
import { queryOptions } from "@tanstack/react-query";
import { TCreateCourseType } from "@server/shared/types";

const client = hc<AppType>("/api");

export const getAllCourses = async () => {
  const res = await client.courses.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const data = await res.json();
  return data;
};

export const getAllCoursesQueryOptions = queryOptions({
  queryKey: ["get-all-courses"],
  queryFn: getAllCourses,
  staleTime: 1000 * 60 * 5,
});

export const getCourseById = async (id: string) => {
  const res = await client.courses[":id"].$get({
    param: {
      id: id.toString(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch course");
  }

  const data = await res.json();
  return data;
};

export const getCourseByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["get-course-by-id", id],
    queryFn: () => getCourseById(id),
    staleTime: 1000 * 60 * 5,
  });

export const createCourse = async (data: TCreateCourseType) => {
  const res = await client.creator.courses.$post({
    json: data,
  });

  if (!res.ok) {
    throw new Error("Failed to create course");
  }

  const course = await res.json();
  return course;
};
