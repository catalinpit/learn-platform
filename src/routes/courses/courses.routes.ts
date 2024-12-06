const tags = ["Courses"];

export const list = {
  method: "GET",
  path: "/courses",
  tags,
  description: "List all courses",
};

export type CoursesRoute = typeof list;
