/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignoutImport } from "./routes/signout";
import { Route as RegisterImport } from "./routes/register";
import { Route as LoginImport } from "./routes/login";
import { Route as AboutImport } from "./routes/about";
import { Route as AuthenticatedImport } from "./routes/_authenticated";
import { Route as IndexImport } from "./routes/index";
import { Route as CoursesCourseIdImport } from "./routes/courses/$courseId";
import { Route as AuthenticatedSettingsIndexImport } from "./routes/_authenticated/settings/index";
import { Route as AuthenticatedCreatorNewCourseImport } from "./routes/_authenticated/creator/new-course";

// Create/Update Routes

const SignoutRoute = SignoutImport.update({
  id: "/signout",
  path: "/signout",
  getParentRoute: () => rootRoute,
} as any);

const RegisterRoute = RegisterImport.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const AboutRoute = AboutImport.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRoute = AuthenticatedImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const CoursesCourseIdRoute = CoursesCourseIdImport.update({
  id: "/courses/$courseId",
  path: "/courses/$courseId",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedSettingsIndexRoute = AuthenticatedSettingsIndexImport.update(
  {
    id: "/settings/",
    path: "/settings/",
    getParentRoute: () => AuthenticatedRoute,
  } as any
);

const AuthenticatedCreatorNewCourseRoute =
  AuthenticatedCreatorNewCourseImport.update({
    id: "/creator/new-course",
    path: "/creator/new-course",
    getParentRoute: () => AuthenticatedRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedImport;
      parentRoute: typeof rootRoute;
    };
    "/about": {
      id: "/about";
      path: "/about";
      fullPath: "/about";
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/register": {
      id: "/register";
      path: "/register";
      fullPath: "/register";
      preLoaderRoute: typeof RegisterImport;
      parentRoute: typeof rootRoute;
    };
    "/signout": {
      id: "/signout";
      path: "/signout";
      fullPath: "/signout";
      preLoaderRoute: typeof SignoutImport;
      parentRoute: typeof rootRoute;
    };
    "/courses/$courseId": {
      id: "/courses/$courseId";
      path: "/courses/$courseId";
      fullPath: "/courses/$courseId";
      preLoaderRoute: typeof CoursesCourseIdImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated/creator/new-course": {
      id: "/_authenticated/creator/new-course";
      path: "/creator/new-course";
      fullPath: "/creator/new-course";
      preLoaderRoute: typeof AuthenticatedCreatorNewCourseImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/settings/": {
      id: "/_authenticated/settings/";
      path: "/settings";
      fullPath: "/settings";
      preLoaderRoute: typeof AuthenticatedSettingsIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedCreatorNewCourseRoute: typeof AuthenticatedCreatorNewCourseRoute;
  AuthenticatedSettingsIndexRoute: typeof AuthenticatedSettingsIndexRoute;
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedCreatorNewCourseRoute: AuthenticatedCreatorNewCourseRoute,
  AuthenticatedSettingsIndexRoute: AuthenticatedSettingsIndexRoute,
};

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "": typeof AuthenticatedRouteWithChildren;
  "/about": typeof AboutRoute;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
  "/signout": typeof SignoutRoute;
  "/courses/$courseId": typeof CoursesCourseIdRoute;
  "/creator/new-course": typeof AuthenticatedCreatorNewCourseRoute;
  "/settings": typeof AuthenticatedSettingsIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "": typeof AuthenticatedRouteWithChildren;
  "/about": typeof AboutRoute;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
  "/signout": typeof SignoutRoute;
  "/courses/$courseId": typeof CoursesCourseIdRoute;
  "/creator/new-course": typeof AuthenticatedCreatorNewCourseRoute;
  "/settings": typeof AuthenticatedSettingsIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_authenticated": typeof AuthenticatedRouteWithChildren;
  "/about": typeof AboutRoute;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
  "/signout": typeof SignoutRoute;
  "/courses/$courseId": typeof CoursesCourseIdRoute;
  "/_authenticated/creator/new-course": typeof AuthenticatedCreatorNewCourseRoute;
  "/_authenticated/settings/": typeof AuthenticatedSettingsIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | ""
    | "/about"
    | "/login"
    | "/register"
    | "/signout"
    | "/courses/$courseId"
    | "/creator/new-course"
    | "/settings";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | ""
    | "/about"
    | "/login"
    | "/register"
    | "/signout"
    | "/courses/$courseId"
    | "/creator/new-course"
    | "/settings";
  id:
    | "__root__"
    | "/"
    | "/_authenticated"
    | "/about"
    | "/login"
    | "/register"
    | "/signout"
    | "/courses/$courseId"
    | "/_authenticated/creator/new-course"
    | "/_authenticated/settings/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren;
  AboutRoute: typeof AboutRoute;
  LoginRoute: typeof LoginRoute;
  RegisterRoute: typeof RegisterRoute;
  SignoutRoute: typeof SignoutRoute;
  CoursesCourseIdRoute: typeof CoursesCourseIdRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutRoute: AboutRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  SignoutRoute: SignoutRoute,
  CoursesCourseIdRoute: CoursesCourseIdRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/about",
        "/login",
        "/register",
        "/signout",
        "/courses/$courseId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/creator/new-course",
        "/_authenticated/settings/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/signout": {
      "filePath": "signout.tsx"
    },
    "/courses/$courseId": {
      "filePath": "courses/$courseId.tsx"
    },
    "/_authenticated/creator/new-course": {
      "filePath": "_authenticated/creator/new-course.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings/": {
      "filePath": "_authenticated/settings/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
