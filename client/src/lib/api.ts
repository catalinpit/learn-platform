import { hc } from "hono/client";
import type { AppType, TCreateLessonType } from "@server/shared/types";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  TCreateChapterType,
  TCreateCourseType,
  TGetAllCoursesType,
  TUpdateChapterType,
} from "@server/shared/types";

const client = hc<AppType>("/api");

export const getAllCourses = async ({
  query,
  page,
  perPage,
}: TGetAllCoursesType) => {
  const res = await client.courses.$get({
    query: {
      query,
      page: String(page),
      perPage: String(perPage),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const courses = await res.json();
  return courses;
};

export const getAllCoursesQueryOptions = ({
  query,
  page,
  perPage,
}: TGetAllCoursesType) =>
  queryOptions({
    queryKey: ["get-all-courses", query, page, perPage],
    queryFn: () => getAllCourses({ query, page, perPage }),
    placeholderData: keepPreviousData,
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

export const getCreatorCourseById = async (id: string) => {
  const res = await client.creator.courses[":id"].$get({
    param: {
      id: id.toString(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch course");
  }

  const course = await res.json();
  return course;
};

export const getCreatorCourseByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ["get-creator-course-by-id", id],
    queryFn: () => getCreatorCourseById(id),
    staleTime: 1000 * 60 * 5,
  });

export const createCourse = async (data: TCreateCourseType) => {
  const res = await client.creator.courses.$post({
    json: {
      ...data,
      tags: data.tags.map((tag) => tag.trim()).join(","),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create course");
  }

  const course = await res.json();
  return course;
};

export const createCourseChapter = async (
  id: string,
  data: TCreateChapterType
) => {
  const res = await client.creator.courses[":id"].chapters.$post({
    param: {
      id,
    },
    json: {
      ...data,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create chapter");
  }

  const chapter = await res.json();
  return chapter;
};

export const createChapterLesson = async (
  id: string,
  chapterId: string,
  data: TCreateLessonType
) => {
  const res = await client.creator.courses[":id"].chapters[
    ":chapterId"
  ].lessons.$post({
    param: {
      id,
      chapterId,
    },
    json: {
      ...data,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create lesson");
  }

  const lesson = await res.json();
  return lesson;
};

export const updateCourseChapter = async (
  id: string,
  chapterId: string,
  data: TUpdateChapterType
) => {
  const res = await client.creator.courses[":id"].chapters[":chapterId"].$patch(
    {
      param: {
        id,
        chapterId,
      },
      json: {
        ...data,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update chapter");
  }

  const chapter = await res.json();
  return chapter;
};

export const deleteCourseChapter = async (id: string, chapterId: string) => {
  const res = await client.creator.courses[":id"].chapters[
    ":chapterId"
  ].$delete({
    param: {
      id,
      chapterId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete chapter");
  }

  const chapter = await res.json();
  return chapter;
};
