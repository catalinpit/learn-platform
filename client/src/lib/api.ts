import { hc } from "hono/client";
import type {
  AppType,
  TCreateLessonType,
  TGetAllCreatorCoursesType,
  TGetAllStudentCoursesType,
  TUpdateCourseType,
  TUpdateLessonType,
} from "@server/shared/types";
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

////////////////////////////
// Creator API Endpoints  //
////////////////////////////

export const getCreatorCourses = async ({
  query,
  page,
  perPage,
}: TGetAllCreatorCoursesType) => {
  const res = await client.creator.courses.$get({
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

export const getCreatorCoursesOptions = ({
  query,
  page,
  perPage,
}: TGetAllCreatorCoursesType) =>
  queryOptions({
    queryKey: ["get-creator-courses", query, page, perPage],
    queryFn: () => getCreatorCourses({ query, page, perPage }),
    placeholderData: keepPreviousData,
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
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create course");
  }

  const course = await res.json();
  return course;
};

export const updateCourse = async (id: string, data: TUpdateCourseType) => {
  if (data.isPublished) {
    throw new Error("Cannot update this field");
  }

  const res = await client.creator.courses[":id"].$patch({
    param: {
      id,
    },
    json: {
      ...data,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update course");
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

export const updateCourseLesson = async (
  id: string,
  chapterId: string,
  lessonId: string,
  data: TUpdateLessonType
) => {
  const res = await client.creator.courses[":id"].chapters[
    ":chapterId"
  ].lessons[":lessonId"].$patch({
    param: {
      id,
      chapterId,
      lessonId,
    },
    json: {
      ...data,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update lesson");
  }

  const lesson = await res.json();
  return lesson;
};

export const deleteCourseLesson = async (
  id: string,
  chapterId: string,
  lessonId: string
) => {
  const res = await client.creator.courses[":id"].chapters[
    ":chapterId"
  ].lessons[":lessonId"].$delete({
    param: {
      id,
      chapterId,
      lessonId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete lesson");
  }

  const lesson = await res.json();
  return lesson;
};

export const deleteCourse = async (id: string) => {
  const res = await client.creator.courses[":id"].$delete({
    param: {
      id,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete course");
  }

  const course = await res.json();
  return course;
};

export const publishCourse = async (id: string) => {
  const res = await client.creator.courses[":id"].publish.$post({
    param: {
      id,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to publish course");
  }

  const course = await res.json();
  return course;
};

export const unpublishCourse = async (id: string) => {
  const res = await client.creator.courses[":id"].unpublish.$post({
    param: {
      id,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to unpublish course");
  }

  const course = await res.json();
  return course;
};

////////////////////////////
// Student API Endpoints  //
////////////////////////////

export const getStudentCourses = async ({
  query,
  page,
  perPage,
}: TGetAllStudentCoursesType) => {
  const res = await client.student.courses.$get({
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

export const getStudentCoursesOptions = ({
  query,
  page,
  perPage,
}: TGetAllStudentCoursesType) =>
  queryOptions({
    queryKey: ["get-student-courses", query, page, perPage],
    queryFn: () => getStudentCourses({ query, page, perPage }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

export const getStudentCourseById = async (id: string) => {
  const res = await client.student.courses[":id"].$get({
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

export const getStudentCourseByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ["get-student-course-by-id", id],
    queryFn: () => getStudentCourseById(id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

export const completeLesson = async (id: string, lessonId: string) => {
  const res = await client.student.courses[":id"]["complete-lesson"].$post({
    param: {
      id,
    },
    json: {
      lessonId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to complete lesson");
  }

  const progress = await res.json();
  return progress;
};
