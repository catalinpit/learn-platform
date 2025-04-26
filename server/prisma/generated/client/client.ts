/**
 * Client
 */

import * as runtime from "@prisma/client/runtime/library";
import * as path from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Course
 *
 */
export type Course = runtime.Types.Result.DefaultSelection<Prisma.$CoursePayload>;
/**
 * Model Chapter
 *
 */
export type Chapter = runtime.Types.Result.DefaultSelection<Prisma.$ChapterPayload>;
/**
 * Model Lesson
 *
 */
export type Lesson = runtime.Types.Result.DefaultSelection<Prisma.$LessonPayload>;
/**
 * Model Progress
 *
 */
export type Progress = runtime.Types.Result.DefaultSelection<Prisma.$ProgressPayload>;
/**
 * Model Session
 *
 */
export type Session = runtime.Types.Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model Account
 *
 */
export type Account = runtime.Types.Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Verification
 *
 */
export type Verification = runtime.Types.Result.DefaultSelection<Prisma.$VerificationPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const Role = {
    ADMIN: "ADMIN",
    CREATOR: "CREATOR",
    STUDENT: "STUDENT",
  } as const;

  export type Role = (typeof Role)[keyof typeof Role];

  export const CourseTag = {
    JAVASCRIPT: "JAVASCRIPT",
    TYPESCRIPT: "TYPESCRIPT",
    REACT: "REACT",
    NEXTJS: "NEXTJS",
    NODE: "NODE",
    PYTHON: "PYTHON",
    JAVA: "JAVA",
    GOLANG: "GOLANG",
    CSS: "CSS",
    HTML: "HTML",
    DESIGN: "DESIGN",
    DEVOPS: "DEVOPS",
    DATABASE: "DATABASE",
    MOBILE: "MOBILE",
    TESTING: "TESTING",
    SECURITY: "SECURITY",
    TECHNICAL_WRITING: "TECHNICAL_WRITING",
    MARKETING: "MARKETING",
  } as const;

  export type CourseTag = (typeof CourseTag)[keyof typeof CourseTag];

}

export type Role = $Enums.Role;

export const Role = $Enums.Role;

export type CourseTag = $Enums.CourseTag;

export const CourseTag = $Enums.CourseTag;

/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client",
    },
    output: {
      value: "/Users/catalinpit/Developer/learn-platform/server/prisma/generated/client",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: "darwin-arm64",
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath: "/Users/catalinpit/Developer/learn-platform/server/prisma/schema.prisma",
    isCustomOutput: true,
  },
  relativePath: "../..",
  clientVersion: "6.6.0",
  engineVersion: "f676762280b54cd07c770017ed3711ddde35f37a",
  datasourceNames: [
    "db",
  ],
  activeProvider: "postgresql",
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: "DATABASE_URL",
        value: null,
      },
    },
  },
  inlineSchema: "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"./generated/client\"\n}\n\ngenerator zod {\n  provider = \"zod-prisma-types\"\n  output   = \"./generated/types\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum Role {\n  ADMIN\n  CREATOR\n  STUDENT\n}\n\nenum CourseTag {\n  JAVASCRIPT\n  TYPESCRIPT\n  REACT\n  NEXTJS\n  NODE\n  PYTHON\n  JAVA\n  GOLANG\n  CSS\n  HTML\n  DESIGN\n  DEVOPS\n  DATABASE\n  MOBILE\n  TESTING\n  SECURITY\n  TECHNICAL_WRITING\n  MARKETING\n}\n\nmodel User {\n  id              String    @id @default(uuid())\n  email           String    @unique\n  name            String?\n  createdAt       DateTime  @default(now())\n  updatedAt       DateTime  @updatedAt\n  ownedCourses    Course[]  @relation(\"CourseOwner\")\n  enrolledCourses Course[]  @relation(\"CourseEnrollments\")\n  emailVerified   Boolean\n  image           String?\n  sessions        Session[]\n  accounts        Account[]\n  roles           Role[]    @default([STUDENT])\n\n  role       String?\n  banned     Boolean?\n  banReason  String?\n  banExpires DateTime?\n\n  @@map(\"user\")\n}\n\nmodel Course {\n  id          String      @id @default(uuid())\n  title       String\n  description String\n  tags        CourseTag[]\n  coverImage  String?\n  price       Float       @default(10)\n  isPublished Boolean     @default(false)\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n  productId   String?\n\n  owner    User       @relation(\"CourseOwner\", fields: [ownerId], references: [id])\n  ownerId  String\n  students User[]     @relation(\"CourseEnrollments\")\n  chapters Chapter[]\n  progress Progress[]\n\n  @@index([ownerId])\n}\n\nmodel Chapter {\n  id          String   @id @default(uuid())\n  title       String\n  description String\n  courseId    String\n  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  isPublished Boolean  @default(false)\n  isFree      Boolean  @default(false)\n  lessons     Lesson[]\n\n  @@index([courseId])\n}\n\nmodel Lesson {\n  id          String     @id @default(uuid())\n  title       String\n  content     String\n  chapterId   String\n  chapter     Chapter    @relation(fields: [chapterId], references: [id], onDelete: Cascade)\n  position    Int\n  isPublished Boolean    @default(false)\n  isFree      Boolean    @default(false)\n  createdAt   DateTime   @default(now())\n  updatedAt   DateTime   @updatedAt\n  progress    Progress[]\n\n  @@index([chapterId])\n}\n\nmodel Progress {\n  id        String   @id @default(uuid())\n  userId    String\n  lessonId  String\n  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)\n  courseId  String\n  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)\n  completed Boolean  @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([userId, lessonId])\n  @@index([userId])\n  @@index([courseId])\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime\n  updatedAt DateTime\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  impersonatedBy String?\n\n  @@unique([token])\n  @@map(\"session\")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime\n  updatedAt             DateTime\n\n  @@map(\"account\")\n}\n\nmodel Verification {\n  id         String    @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime?\n  updatedAt  DateTime?\n\n  @@map(\"verification\")\n}\n",
  inlineSchemaHash: "cc801c1406e89f9deeef4e454dcbf1ac815410abfeb26600ae53f175edf7c580",
  copyEngine: true,
  runtimeDataModel: {
    models: {},
    enums: {},
    types: {},
  },
  dirname: "",
};
config.dirname = __dirname;

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"user\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ownedCourses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Course\",\"nativeType\":null,\"relationName\":\"CourseOwner\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enrolledCourses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Course\",\"nativeType\":null,\"relationName\":\"CourseEnrollments\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"nativeType\":null,\"relationName\":\"SessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accounts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Account\",\"nativeType\":null,\"relationName\":\"AccountToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"nativeType\":null,\"default\":[\"STUDENT\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"banned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"banReason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"banExpires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Course\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourseTag\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coverImage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"nativeType\":null,\"default\":10,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"productId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"CourseOwner\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"students\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"CourseEnrollments\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chapters\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chapter\",\"nativeType\":null,\"relationName\":\"ChapterToCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"progress\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Progress\",\"nativeType\":null,\"relationName\":\"CourseToProgress\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Chapter\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Course\",\"nativeType\":null,\"relationName\":\"ChapterToCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lessons\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Lesson\",\"nativeType\":null,\"relationName\":\"ChapterToLesson\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Lesson\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chapterId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chapter\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chapter\",\"nativeType\":null,\"relationName\":\"ChapterToLesson\",\"relationFromFields\":[\"chapterId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"position\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"progress\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Progress\",\"nativeType\":null,\"relationName\":\"LessonToProgress\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Progress\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lessonId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lesson\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Lesson\",\"nativeType\":null,\"relationName\":\"LessonToProgress\",\"relationFromFields\":[\"lessonId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Course\",\"nativeType\":null,\"relationName\":\"CourseToProgress\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"lessonId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"lessonId\"]}],\"isGenerated\":false},\"Session\":{\"dbName\":\"session\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"SessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"impersonatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"token\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"token\"]}],\"isGenerated\":false},\"Account\":{\"dbName\":\"account\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"AccountToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"idToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessTokenExpiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshTokenExpiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Verification\":{\"dbName\":\"verification\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Role\":{\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"CREATOR\",\"dbName\":null},{\"name\":\"STUDENT\",\"dbName\":null}],\"dbName\":null},\"CourseTag\":{\"values\":[{\"name\":\"JAVASCRIPT\",\"dbName\":null},{\"name\":\"TYPESCRIPT\",\"dbName\":null},{\"name\":\"REACT\",\"dbName\":null},{\"name\":\"NEXTJS\",\"dbName\":null},{\"name\":\"NODE\",\"dbName\":null},{\"name\":\"PYTHON\",\"dbName\":null},{\"name\":\"JAVA\",\"dbName\":null},{\"name\":\"GOLANG\",\"dbName\":null},{\"name\":\"CSS\",\"dbName\":null},{\"name\":\"HTML\",\"dbName\":null},{\"name\":\"DESIGN\",\"dbName\":null},{\"name\":\"DEVOPS\",\"dbName\":null},{\"name\":\"DATABASE\",\"dbName\":null},{\"name\":\"MOBILE\",\"dbName\":null},{\"name\":\"TESTING\",\"dbName\":null},{\"name\":\"SECURITY\",\"dbName\":null},{\"name\":\"TECHNICAL_WRITING\",\"dbName\":null},{\"name\":\"MARKETING\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}");
config.engineWasm = undefined;
config.compilerWasm = undefined;

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "prisma/generated/client/libquery_engine-darwin-arm64.dylib.node");
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma/generated/client/schema.prisma");

interface PrismaClientConstructor {
  /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new<
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = "log" extends keyof ClientOptions ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions["log"]> : never : never,
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  >(options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>): PrismaClient<ClientOptions, U, ExtArgs>;
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions["log"]> : never : never,
  ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  $on: <V extends U>(eventType: V, callback: (event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent) => void) => PrismaClient;

  /**
   * Connect with the database
   */
  $connect: () => runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect: () => runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use: (cb: Prisma.Middleware) => void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw: <T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]) => Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe: <T = unknown>(query: string, ...values: any[]) => Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw: <T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]) => Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe: <T = unknown>(query: string, ...values: any[]) => Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction: (<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }) => runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>) & (<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number; timeout?: number; isolationLevel?: Prisma.TransactionIsolationLevel }) => runtime.Types.Utils.JsPromise<R>);

  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs;
  }>>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Courses
   * const courses = await prisma.course.findMany()
   * ```
   */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chapter`: Exposes CRUD operations for the **Chapter** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Chapters
   * const chapters = await prisma.chapter.findMany()
   * ```
   */
  get chapter(): Prisma.ChapterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lesson`: Exposes CRUD operations for the **Lesson** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Lessons
   * const lessons = await prisma.lesson.findMany()
   * ```
   */
  get lesson(): Prisma.LessonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progress`: Exposes CRUD operations for the **Progress** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Progresses
   * const progresses = await prisma.progress.findMany()
   * ```
   */
  get progress(): Prisma.ProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Verifications
   * const verifications = await prisma.verification.findMany()
   * ```
   */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(config) as unknown as PrismaClientConstructor;

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF;

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export const validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;

  export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;

  export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;

  export const PrismaClientValidationError = runtime.PrismaClientValidationError;
  export type PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag;
  export const empty = runtime.empty;
  export const join = runtime.join;
  export const raw = runtime.raw;
  export const Sql = runtime.Sql;
  export type Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal;
  export type Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export type Extension = runtime.Types.Extensions.UserArgs;
  export const getExtensionContext = runtime.Extensions.getExtensionContext;
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
  export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
  export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;

  export interface PrismaVersion {
    client: string;
    engine: string;
  }

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: "6.6.0",
    engine: "f676762280b54cd07c770017ed3711ddde35f37a",
  };

  /**
   * Utility Types
   */

  export type JsonObject = runtime.JsonObject;
  export type JsonArray = runtime.JsonArray;
  export type JsonValue = runtime.JsonValue;
  export type InputJsonObject = runtime.InputJsonObject;
  export type InputJsonArray = runtime.InputJsonArray;
  export type InputJsonValue = runtime.InputJsonValue;

  export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull),
    JsonNull: runtime.objectEnumValues.classes.JsonNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull),
    AnyNull: runtime.objectEnumValues.classes.AnyNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull),
  };

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull = runtime.objectEnumValues.instances.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull = runtime.objectEnumValues.instances.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull = runtime.objectEnumValues.instances.AnyNull;

  interface SelectAndInclude {
    select: any;
    include: any;
  }

  interface SelectAndOmit {
    select: any;
    omit: any;
  }

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
  (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
  K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
      U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
        : U : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
      ? False
      : T extends Uint8Array
        ? False
        : T extends bigint
          ? False
          : T extends object
            ? True
            : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean,
  > = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {};

  /** Helper Types for "Merge" */
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | { [P in keyof O as P extends K ? P : never]-?: O[P] } & O
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" */

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False;

  export type True = 1;

  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
    // based on the brilliant idea of Pierre-Antoine Mills
    // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
      T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
          ? never
          : K
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;

  export const ModelName = {
    User: "User",
    Course: "Course",
    Chapter: "Chapter",
    Lesson: "Lesson",
    Progress: "Progress",
    Session: "Session",
    Account: "Account",
    Verification: "Verification",
  } as const;

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export interface Datasources {
    db?: Datasource;
  }

  export interface TypeMapCb<ClientOptions = {}> extends runtime.Types.Utils.Fn<{ extArgs: runtime.Types.Extensions.InternalArgs }, runtime.Types.Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this["params"]["extArgs"], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>;
  }

  export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "user" | "course" | "chapter" | "lesson" | "progress" | "session" | "account" | "verification";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>;
        fields: Prisma.CourseFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
          };
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
          };
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
          };
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
          };
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
          };
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
          };
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
          };
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
          };
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
          };
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateCourse>;
          };
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<CourseGroupByOutputType>[];
          };
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<CourseCountAggregateOutputType> | number;
          };
        };
      };
      Chapter: {
        payload: Prisma.$ChapterPayload<ExtArgs>;
        fields: Prisma.ChapterFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChapterFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChapterFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>;
          };
          findFirst: {
            args: Prisma.ChapterFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChapterFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>;
          };
          findMany: {
            args: Prisma.ChapterFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>[];
          };
          create: {
            args: Prisma.ChapterCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>;
          };
          createMany: {
            args: Prisma.ChapterCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ChapterCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>[];
          };
          delete: {
            args: Prisma.ChapterDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>;
          };
          update: {
            args: Prisma.ChapterUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>;
          };
          deleteMany: {
            args: Prisma.ChapterDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ChapterUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ChapterUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>[];
          };
          upsert: {
            args: Prisma.ChapterUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChapterPayload>;
          };
          aggregate: {
            args: Prisma.ChapterAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateChapter>;
          };
          groupBy: {
            args: Prisma.ChapterGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ChapterGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChapterCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ChapterCountAggregateOutputType> | number;
          };
        };
      };
      Lesson: {
        payload: Prisma.$LessonPayload<ExtArgs>;
        fields: Prisma.LessonFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.LessonFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.LessonFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>;
          };
          findFirst: {
            args: Prisma.LessonFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.LessonFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>;
          };
          findMany: {
            args: Prisma.LessonFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>[];
          };
          create: {
            args: Prisma.LessonCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>;
          };
          createMany: {
            args: Prisma.LessonCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.LessonCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>[];
          };
          delete: {
            args: Prisma.LessonDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>;
          };
          update: {
            args: Prisma.LessonUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>;
          };
          deleteMany: {
            args: Prisma.LessonDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.LessonUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.LessonUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>[];
          };
          upsert: {
            args: Prisma.LessonUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$LessonPayload>;
          };
          aggregate: {
            args: Prisma.LessonAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateLesson>;
          };
          groupBy: {
            args: Prisma.LessonGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<LessonGroupByOutputType>[];
          };
          count: {
            args: Prisma.LessonCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<LessonCountAggregateOutputType> | number;
          };
        };
      };
      Progress: {
        payload: Prisma.$ProgressPayload<ExtArgs>;
        fields: Prisma.ProgressFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProgressFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProgressFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>;
          };
          findFirst: {
            args: Prisma.ProgressFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProgressFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>;
          };
          findMany: {
            args: Prisma.ProgressFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>[];
          };
          create: {
            args: Prisma.ProgressCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>;
          };
          createMany: {
            args: Prisma.ProgressCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProgressCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>[];
          };
          delete: {
            args: Prisma.ProgressDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>;
          };
          update: {
            args: Prisma.ProgressUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>;
          };
          deleteMany: {
            args: Prisma.ProgressDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProgressUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProgressUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>[];
          };
          upsert: {
            args: Prisma.ProgressUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressPayload>;
          };
          aggregate: {
            args: Prisma.ProgressAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateProgress>;
          };
          groupBy: {
            args: Prisma.ProgressGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ProgressGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProgressCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ProgressCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>;
        fields: Prisma.AccountFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateAccount>;
          };
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AccountGroupByOutputType>[];
          };
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AccountCountAggregateOutputType> | number;
          };
        };
      };
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>;
        fields: Prisma.VerificationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
          };
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
          };
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
          };
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
          };
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateVerification>;
          };
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<VerificationGroupByOutputType>[];
          };
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<VerificationCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", Prisma.TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export interface GlobalOmitConfig {
    user?: UserOmit;
    course?: CourseOmit;
    chapter?: ChapterOmit;
    lesson?: LessonOmit;
    progress?: ProgressOmit;
    session?: SessionOmit;
    account?: AccountOmit;
    verification?: VerificationOmit;
  }

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export interface LogDefinition {
    level: LogLevel;
    emit: "stdout" | "event";
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T["emit"] extends "event" ? T["level"] : never : never;
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export interface QueryEvent {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  }

  export interface LogEvent {
    timestamp: Date;
    message: string;
    target: string;
  }
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export interface MiddlewareParams {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
  ) => runtime.Types.Utils.JsPromise<T>;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export interface Datasource {
    url?: string;
  }

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export interface UserCountOutputType {
    ownedCourses: number;
    enrolledCourses: number;
    sessions: number;
    accounts: number;
  }

  export interface UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    ownedCourses?: boolean | UserCountOutputTypeCountOwnedCoursesArgs;
    enrolledCourses?: boolean | UserCountOutputTypeCountEnrolledCoursesArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export interface UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  }

  /**
   * UserCountOutputType without action
   */
  export interface UserCountOutputTypeCountOwnedCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: CourseWhereInput;
  }

  /**
   * UserCountOutputType without action
   */
  export interface UserCountOutputTypeCountEnrolledCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: CourseWhereInput;
  }

  /**
   * UserCountOutputType without action
   */
  export interface UserCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: SessionWhereInput;
  }

  /**
   * UserCountOutputType without action
   */
  export interface UserCountOutputTypeCountAccountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: AccountWhereInput;
  }

  /**
   * Count Type CourseCountOutputType
   */

  export interface CourseCountOutputType {
    students: number;
    chapters: number;
    progress: number;
  }

  export interface CourseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    students?: boolean | CourseCountOutputTypeCountStudentsArgs;
    chapters?: boolean | CourseCountOutputTypeCountChaptersArgs;
    progress?: boolean | CourseCountOutputTypeCountProgressArgs;
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export interface CourseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null;
  }

  /**
   * CourseCountOutputType without action
   */
  export interface CourseCountOutputTypeCountStudentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: UserWhereInput;
  }

  /**
   * CourseCountOutputType without action
   */
  export interface CourseCountOutputTypeCountChaptersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: ChapterWhereInput;
  }

  /**
   * CourseCountOutputType without action
   */
  export interface CourseCountOutputTypeCountProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: ProgressWhereInput;
  }

  /**
   * Count Type ChapterCountOutputType
   */

  export interface ChapterCountOutputType {
    lessons: number;
  }

  export interface ChapterCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    lessons?: boolean | ChapterCountOutputTypeCountLessonsArgs;
  }

  // Custom InputTypes
  /**
   * ChapterCountOutputType without action
   */
  export interface ChapterCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the ChapterCountOutputType
     */
    select?: ChapterCountOutputTypeSelect<ExtArgs> | null;
  }

  /**
   * ChapterCountOutputType without action
   */
  export interface ChapterCountOutputTypeCountLessonsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: LessonWhereInput;
  }

  /**
   * Count Type LessonCountOutputType
   */

  export interface LessonCountOutputType {
    progress: number;
  }

  export interface LessonCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    progress?: boolean | LessonCountOutputTypeCountProgressArgs;
  }

  // Custom InputTypes
  /**
   * LessonCountOutputType without action
   */
  export interface LessonCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the LessonCountOutputType
     */
    select?: LessonCountOutputTypeSelect<ExtArgs> | null;
  }

  /**
   * LessonCountOutputType without action
   */
  export interface LessonCountOutputTypeCountProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: ProgressWhereInput;
  }

  /**
   * Models
   */

  /**
   * Model User
   */

  export interface AggregateUser {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  }

  export interface UserMinAggregateOutputType {
    id: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    emailVerified: boolean | null;
    image: string | null;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
  }

  export interface UserMaxAggregateOutputType {
    id: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    emailVerified: boolean | null;
    image: string | null;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
  }

  export interface UserCountAggregateOutputType {
    id: number;
    email: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    emailVerified: number;
    image: number;
    roles: number;
    role: number;
    banned: number;
    banReason: number;
    banExpires: number;
    _all: number;
  }

  export interface UserMinAggregateInputType {
    id?: true;
    email?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    emailVerified?: true;
    image?: true;
    role?: true;
    banned?: true;
    banReason?: true;
    banExpires?: true;
  }

  export interface UserMaxAggregateInputType {
    id?: true;
    email?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    emailVerified?: true;
    image?: true;
    role?: true;
    banned?: true;
    banReason?: true;
    banExpires?: true;
  }

  export interface UserCountAggregateInputType {
    id?: true;
    email?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    emailVerified?: true;
    image?: true;
    roles?: true;
    role?: true;
    banned?: true;
    banReason?: true;
    banExpires?: true;
    _all?: true;
  }

  export interface UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     */
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: UserMaxAggregateInputType;
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  };

  export interface UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: UserWhereInput;
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  }

  export interface UserGroupByOutputType {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    image: string | null;
    roles: $Enums.Role[];
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>
      }
    >
  >;

  export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    roles?: boolean;
    role?: boolean;
    banned?: boolean;
    banReason?: boolean;
    banExpires?: boolean;
    ownedCourses?: boolean | User$ownedCoursesArgs<ExtArgs>;
    enrolledCourses?: boolean | User$enrolledCoursesArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["user"]>;

  export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    roles?: boolean;
    role?: boolean;
    banned?: boolean;
    banReason?: boolean;
    banExpires?: boolean;
  }, ExtArgs["result"]["user"]>;

  export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    roles?: boolean;
    role?: boolean;
    banned?: boolean;
    banReason?: boolean;
    banExpires?: boolean;
  }, ExtArgs["result"]["user"]>;

  export interface UserSelectScalar {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    emailVerified?: boolean;
    image?: boolean;
    roles?: boolean;
    role?: boolean;
    banned?: boolean;
    banReason?: boolean;
    banExpires?: boolean;
  }

  export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "updatedAt" | "emailVerified" | "image" | "roles" | "role" | "banned" | "banReason" | "banExpires", ExtArgs["result"]["user"]>;
  export interface UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    ownedCourses?: boolean | User$ownedCoursesArgs<ExtArgs>;
    enrolledCourses?: boolean | User$enrolledCoursesArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  }
  export interface UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {}
  export interface UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {}

  export interface $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "User";
    objects: {
      ownedCourses: Prisma.$CoursePayload<ExtArgs>[];
      enrolledCourses: Prisma.$CoursePayload<ExtArgs>[];
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      accounts: Prisma.$AccountPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      email: string;
      name: string | null;
      createdAt: Date;
      updatedAt: Date;
      emailVerified: boolean;
      image: string | null;
      roles: $Enums.Role[];
      role: string | null;
      banned: boolean | null;
      banReason: string | null;
      banExpires: Date | null;
    }, ExtArgs["result"]["user"]>;
    composites: {};
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;

  export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: UserCountAggregateInputType | true;
    };

  export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["User"]; meta: { name: "User" } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     */
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ownedCourses<T extends User$ownedCoursesArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    enrolledCourses<T extends User$enrolledCoursesArgs<ExtArgs> = {}>(args?: Subset<T, User$enrolledCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  export interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly name: FieldRef<"User", "String">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
    readonly emailVerified: FieldRef<"User", "Boolean">;
    readonly image: FieldRef<"User", "String">;
    readonly roles: FieldRef<"User", "Role[]">;
    readonly role: FieldRef<"User", "String">;
    readonly banned: FieldRef<"User", "Boolean">;
    readonly banReason: FieldRef<"User", "String">;
    readonly banExpires: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  }

  /**
   * User findUniqueOrThrow
   */
  export interface UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  }

  /**
   * User findFirstOrThrow
   */
  export interface UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  }

  /**
   * User findMany
   */
  export interface UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  }

  /**
   * User create
   */
  export interface UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  }

  /**
   * User createMany
   */
  export interface UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * User createManyAndReturn
   */
  export interface UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * User update
   */
  export interface UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  }

  /**
   * User updateMany
   */
  export interface UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  }

  /**
   * User updateManyAndReturn
   */
  export interface UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  }

  /**
   * User upsert
   */
  export interface UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  }

  /**
   * User delete
   */
  export interface UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  }

  /**
   * User deleteMany
   */
  export interface UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  }

  /**
   * User.ownedCourses
   */
  export interface User$ownedCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    where?: CourseWhereInput;
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
    cursor?: CourseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
  }

  /**
   * User.enrolledCourses
   */
  export interface User$enrolledCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    where?: CourseWhereInput;
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
    cursor?: CourseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
  }

  /**
   * User.sessions
   */
  export interface User$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  }

  /**
   * User.accounts
   */
  export interface User$accountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  }

  /**
   * User without action
   */
  export interface UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  }

  /**
   * Model Course
   */

  export interface AggregateCourse {
    _count: CourseCountAggregateOutputType | null;
    _avg: CourseAvgAggregateOutputType | null;
    _sum: CourseSumAggregateOutputType | null;
    _min: CourseMinAggregateOutputType | null;
    _max: CourseMaxAggregateOutputType | null;
  }

  export interface CourseAvgAggregateOutputType {
    price: number | null;
  }

  export interface CourseSumAggregateOutputType {
    price: number | null;
  }

  export interface CourseMinAggregateOutputType {
    id: string | null;
    title: string | null;
    description: string | null;
    coverImage: string | null;
    price: number | null;
    isPublished: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    productId: string | null;
    ownerId: string | null;
  }

  export interface CourseMaxAggregateOutputType {
    id: string | null;
    title: string | null;
    description: string | null;
    coverImage: string | null;
    price: number | null;
    isPublished: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    productId: string | null;
    ownerId: string | null;
  }

  export interface CourseCountAggregateOutputType {
    id: number;
    title: number;
    description: number;
    tags: number;
    coverImage: number;
    price: number;
    isPublished: number;
    createdAt: number;
    updatedAt: number;
    productId: number;
    ownerId: number;
    _all: number;
  }

  export interface CourseAvgAggregateInputType {
    price?: true;
  }

  export interface CourseSumAggregateInputType {
    price?: true;
  }

  export interface CourseMinAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    coverImage?: true;
    price?: true;
    isPublished?: true;
    createdAt?: true;
    updatedAt?: true;
    productId?: true;
    ownerId?: true;
  }

  export interface CourseMaxAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    coverImage?: true;
    price?: true;
    isPublished?: true;
    createdAt?: true;
    updatedAt?: true;
    productId?: true;
    ownerId?: true;
  }

  export interface CourseCountAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    tags?: true;
    coverImage?: true;
    price?: true;
    isPublished?: true;
    createdAt?: true;
    updatedAt?: true;
    productId?: true;
    ownerId?: true;
    _all?: true;
  }

  export interface CourseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Courses
     */
    _count?: true | CourseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     */
    _avg?: CourseAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     */
    _sum?: CourseSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: CourseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: CourseMaxAggregateInputType;
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
    [P in keyof T & keyof AggregateCourse]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  };

  export interface CourseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: CourseWhereInput;
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[];
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum;
    having?: CourseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CourseCountAggregateInputType | true;
    _avg?: CourseAvgAggregateInputType;
    _sum?: CourseSumAggregateInputType;
    _min?: CourseMinAggregateInputType;
    _max?: CourseMaxAggregateInputType;
  }

  export interface CourseGroupByOutputType {
    id: string;
    title: string;
    description: string;
    tags: $Enums.CourseTag[];
    coverImage: string | null;
    price: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    productId: string | null;
    ownerId: string;
    _count: CourseCountAggregateOutputType | null;
    _avg: CourseAvgAggregateOutputType | null;
    _sum: CourseSumAggregateOutputType | null;
    _min: CourseMinAggregateOutputType | null;
    _max: CourseMaxAggregateOutputType | null;
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
          : GetScalarType<T[P], CourseGroupByOutputType[P]>
      }
    >
  >;

  export type CourseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    tags?: boolean;
    coverImage?: boolean;
    price?: boolean;
    isPublished?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    productId?: boolean;
    ownerId?: boolean;
    owner?: boolean | UserDefaultArgs<ExtArgs>;
    students?: boolean | Course$studentsArgs<ExtArgs>;
    chapters?: boolean | Course$chaptersArgs<ExtArgs>;
    progress?: boolean | Course$progressArgs<ExtArgs>;
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["course"]>;

  export type CourseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    tags?: boolean;
    coverImage?: boolean;
    price?: boolean;
    isPublished?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    productId?: boolean;
    ownerId?: boolean;
    owner?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["course"]>;

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    tags?: boolean;
    coverImage?: boolean;
    price?: boolean;
    isPublished?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    productId?: boolean;
    ownerId?: boolean;
    owner?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["course"]>;

  export interface CourseSelectScalar {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    tags?: boolean;
    coverImage?: boolean;
    price?: boolean;
    isPublished?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    productId?: boolean;
    ownerId?: boolean;
  }

  export type CourseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "tags" | "coverImage" | "price" | "isPublished" | "createdAt" | "updatedAt" | "productId" | "ownerId", ExtArgs["result"]["course"]>;
  export interface CourseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    owner?: boolean | UserDefaultArgs<ExtArgs>;
    students?: boolean | Course$studentsArgs<ExtArgs>;
    chapters?: boolean | Course$chaptersArgs<ExtArgs>;
    progress?: boolean | Course$progressArgs<ExtArgs>;
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>;
  }
  export interface CourseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    owner?: boolean | UserDefaultArgs<ExtArgs>;
  }
  export interface CourseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    owner?: boolean | UserDefaultArgs<ExtArgs>;
  }

  export interface $CoursePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Course";
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>;
      students: Prisma.$UserPayload<ExtArgs>[];
      chapters: Prisma.$ChapterPayload<ExtArgs>[];
      progress: Prisma.$ProgressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      title: string;
      description: string;
      tags: $Enums.CourseTag[];
      coverImage: string | null;
      price: number;
      isPublished: boolean;
      createdAt: Date;
      updatedAt: Date;
      productId: string | null;
      ownerId: string;
    }, ExtArgs["result"]["course"]>;
    composites: {};
  }

  export type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CoursePayload, S>;

  export type CourseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: CourseCountAggregateInputType | true;
    };

  export interface CourseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Course"]; meta: { name: "Course" } };
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     *
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     *
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     *
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
     */
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CourseCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>;

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs["orderBy"] }
        : { orderBy?: CourseGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Course model
     */
    readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    students<T extends Course$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chapters<T extends Course$chaptersArgs<ExtArgs> = {}>(args?: Subset<T, Course$chaptersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    progress<T extends Course$progressArgs<ExtArgs> = {}>(args?: Subset<T, Course$progressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Course model
   */
  export interface CourseFieldRefs {
    readonly id: FieldRef<"Course", "String">;
    readonly title: FieldRef<"Course", "String">;
    readonly description: FieldRef<"Course", "String">;
    readonly tags: FieldRef<"Course", "CourseTag[]">;
    readonly coverImage: FieldRef<"Course", "String">;
    readonly price: FieldRef<"Course", "Float">;
    readonly isPublished: FieldRef<"Course", "Boolean">;
    readonly createdAt: FieldRef<"Course", "DateTime">;
    readonly updatedAt: FieldRef<"Course", "DateTime">;
    readonly productId: FieldRef<"Course", "String">;
    readonly ownerId: FieldRef<"Course", "String">;
  }

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export interface CourseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput;
  }

  /**
   * Course findUniqueOrThrow
   */
  export interface CourseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput;
  }

  /**
   * Course findFirst
   */
  export interface CourseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
  }

  /**
   * Course findFirstOrThrow
   */
  export interface CourseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
  }

  /**
   * Course findMany
   */
  export interface CourseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
  }

  /**
   * Course create
   */
  export interface CourseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>;
  }

  /**
   * Course createMany
   */
  export interface CourseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Course createManyAndReturn
   */
  export interface CourseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Course update
   */
  export interface CourseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>;
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput;
  }

  /**
   * Course updateMany
   */
  export interface CourseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>;
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput;
    /**
     * Limit how many Courses to update.
     */
    limit?: number;
  }

  /**
   * Course updateManyAndReturn
   */
  export interface CourseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>;
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput;
    /**
     * Limit how many Courses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Course upsert
   */
  export interface CourseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput;
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>;
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>;
  }

  /**
   * Course delete
   */
  export interface CourseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput;
  }

  /**
   * Course deleteMany
   */
  export interface CourseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput;
    /**
     * Limit how many Courses to delete.
     */
    limit?: number;
  }

  /**
   * Course.students
   */
  export interface Course$studentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    cursor?: UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  }

  /**
   * Course.chapters
   */
  export interface Course$chaptersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    where?: ChapterWhereInput;
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[];
    cursor?: ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[];
  }

  /**
   * Course.progress
   */
  export interface Course$progressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    where?: ProgressWhereInput;
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[];
    cursor?: ProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[];
  }

  /**
   * Course without action
   */
  export interface CourseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null;
  }

  /**
   * Model Chapter
   */

  export interface AggregateChapter {
    _count: ChapterCountAggregateOutputType | null;
    _min: ChapterMinAggregateOutputType | null;
    _max: ChapterMaxAggregateOutputType | null;
  }

  export interface ChapterMinAggregateOutputType {
    id: string | null;
    title: string | null;
    description: string | null;
    courseId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isPublished: boolean | null;
    isFree: boolean | null;
  }

  export interface ChapterMaxAggregateOutputType {
    id: string | null;
    title: string | null;
    description: string | null;
    courseId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isPublished: boolean | null;
    isFree: boolean | null;
  }

  export interface ChapterCountAggregateOutputType {
    id: number;
    title: number;
    description: number;
    courseId: number;
    createdAt: number;
    updatedAt: number;
    isPublished: number;
    isFree: number;
    _all: number;
  }

  export interface ChapterMinAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    courseId?: true;
    createdAt?: true;
    updatedAt?: true;
    isPublished?: true;
    isFree?: true;
  }

  export interface ChapterMaxAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    courseId?: true;
    createdAt?: true;
    updatedAt?: true;
    isPublished?: true;
    isFree?: true;
  }

  export interface ChapterCountAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    courseId?: true;
    createdAt?: true;
    updatedAt?: true;
    isPublished?: true;
    isFree?: true;
    _all?: true;
  }

  export interface ChapterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Chapter to aggregate.
     */
    where?: ChapterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChapterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chapters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Chapters
     */
    _count?: true | ChapterCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: ChapterMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: ChapterMaxAggregateInputType;
  }

  export type GetChapterAggregateType<T extends ChapterAggregateArgs> = {
    [P in keyof T & keyof AggregateChapter]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChapter[P]>
      : GetScalarType<T[P], AggregateChapter[P]>
  };

  export interface ChapterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: ChapterWhereInput;
    orderBy?: ChapterOrderByWithAggregationInput | ChapterOrderByWithAggregationInput[];
    by: ChapterScalarFieldEnum[] | ChapterScalarFieldEnum;
    having?: ChapterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChapterCountAggregateInputType | true;
    _min?: ChapterMinAggregateInputType;
    _max?: ChapterMaxAggregateInputType;
  }

  export interface ChapterGroupByOutputType {
    id: string;
    title: string;
    description: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    isFree: boolean;
    _count: ChapterCountAggregateOutputType | null;
    _min: ChapterMinAggregateOutputType | null;
    _max: ChapterMaxAggregateOutputType | null;
  }

  type GetChapterGroupByPayload<T extends ChapterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChapterGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof ChapterGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ChapterGroupByOutputType[P]>
          : GetScalarType<T[P], ChapterGroupByOutputType[P]>
      }
    >
  >;

  export type ChapterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    courseId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
    lessons?: boolean | Chapter$lessonsArgs<ExtArgs>;
    _count?: boolean | ChapterCountOutputTypeDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["chapter"]>;

  export type ChapterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    courseId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["chapter"]>;

  export type ChapterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    courseId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["chapter"]>;

  export interface ChapterSelectScalar {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    courseId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
  }

  export type ChapterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "courseId" | "createdAt" | "updatedAt" | "isPublished" | "isFree", ExtArgs["result"]["chapter"]>;
  export interface ChapterInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    course?: boolean | CourseDefaultArgs<ExtArgs>;
    lessons?: boolean | Chapter$lessonsArgs<ExtArgs>;
    _count?: boolean | ChapterCountOutputTypeDefaultArgs<ExtArgs>;
  }
  export interface ChapterIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }
  export interface ChapterIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }

  export interface $ChapterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Chapter";
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>;
      lessons: Prisma.$LessonPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      title: string;
      description: string;
      courseId: string;
      createdAt: Date;
      updatedAt: Date;
      isPublished: boolean;
      isFree: boolean;
    }, ExtArgs["result"]["chapter"]>;
    composites: {};
  }

  export type ChapterGetPayload<S extends boolean | null | undefined | ChapterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChapterPayload, S>;

  export type ChapterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<ChapterFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: ChapterCountAggregateInputType | true;
    };

  export interface ChapterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Chapter"]; meta: { name: "Chapter" } };
    /**
     * Find zero or one Chapter that matches the filter.
     * @param {ChapterFindUniqueArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChapterFindUniqueArgs>(args: SelectSubset<T, ChapterFindUniqueArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Chapter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChapterFindUniqueOrThrowArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChapterFindUniqueOrThrowArgs>(args: SelectSubset<T, ChapterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Chapter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterFindFirstArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChapterFindFirstArgs>(args?: SelectSubset<T, ChapterFindFirstArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Chapter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterFindFirstOrThrowArgs} args - Arguments to find a Chapter
     * @example
     * // Get one Chapter
     * const chapter = await prisma.chapter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChapterFindFirstOrThrowArgs>(args?: SelectSubset<T, ChapterFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Chapters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chapters
     * const chapters = await prisma.chapter.findMany()
     *
     * // Get first 10 Chapters
     * const chapters = await prisma.chapter.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const chapterWithIdOnly = await prisma.chapter.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ChapterFindManyArgs>(args?: SelectSubset<T, ChapterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Chapter.
     * @param {ChapterCreateArgs} args - Arguments to create a Chapter.
     * @example
     * // Create one Chapter
     * const Chapter = await prisma.chapter.create({
     *   data: {
     *     // ... data to create a Chapter
     *   }
     * })
     *
     */
    create<T extends ChapterCreateArgs>(args: SelectSubset<T, ChapterCreateArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Chapters.
     * @param {ChapterCreateManyArgs} args - Arguments to create many Chapters.
     * @example
     * // Create many Chapters
     * const chapter = await prisma.chapter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ChapterCreateManyArgs>(args?: SelectSubset<T, ChapterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Chapters and returns the data saved in the database.
     * @param {ChapterCreateManyAndReturnArgs} args - Arguments to create many Chapters.
     * @example
     * // Create many Chapters
     * const chapter = await prisma.chapter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Chapters and only return the `id`
     * const chapterWithIdOnly = await prisma.chapter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ChapterCreateManyAndReturnArgs>(args?: SelectSubset<T, ChapterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Chapter.
     * @param {ChapterDeleteArgs} args - Arguments to delete one Chapter.
     * @example
     * // Delete one Chapter
     * const Chapter = await prisma.chapter.delete({
     *   where: {
     *     // ... filter to delete one Chapter
     *   }
     * })
     *
     */
    delete<T extends ChapterDeleteArgs>(args: SelectSubset<T, ChapterDeleteArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Chapter.
     * @param {ChapterUpdateArgs} args - Arguments to update one Chapter.
     * @example
     * // Update one Chapter
     * const chapter = await prisma.chapter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ChapterUpdateArgs>(args: SelectSubset<T, ChapterUpdateArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Chapters.
     * @param {ChapterDeleteManyArgs} args - Arguments to filter Chapters to delete.
     * @example
     * // Delete a few Chapters
     * const { count } = await prisma.chapter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ChapterDeleteManyArgs>(args?: SelectSubset<T, ChapterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Chapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chapters
     * const chapter = await prisma.chapter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ChapterUpdateManyArgs>(args: SelectSubset<T, ChapterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Chapters and returns the data updated in the database.
     * @param {ChapterUpdateManyAndReturnArgs} args - Arguments to update many Chapters.
     * @example
     * // Update many Chapters
     * const chapter = await prisma.chapter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Chapters and only return the `id`
     * const chapterWithIdOnly = await prisma.chapter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ChapterUpdateManyAndReturnArgs>(args: SelectSubset<T, ChapterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Chapter.
     * @param {ChapterUpsertArgs} args - Arguments to update or create a Chapter.
     * @example
     * // Update or create a Chapter
     * const chapter = await prisma.chapter.upsert({
     *   create: {
     *     // ... data to create a Chapter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chapter we want to update
     *   }
     * })
     */
    upsert<T extends ChapterUpsertArgs>(args: SelectSubset<T, ChapterUpsertArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Chapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterCountArgs} args - Arguments to filter Chapters to count.
     * @example
     * // Count the number of Chapters
     * const count = await prisma.chapter.count({
     *   where: {
     *     // ... the filter for the Chapters we want to count
     *   }
     * })
     */
    count<T extends ChapterCountArgs>(
      args?: Subset<T, ChapterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ChapterCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Chapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends ChapterAggregateArgs>(args: Subset<T, ChapterAggregateArgs>): Prisma.PrismaPromise<GetChapterAggregateType<T>>;

    /**
     * Group by Chapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends ChapterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChapterGroupByArgs["orderBy"] }
        : { orderBy?: ChapterGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, ChapterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChapterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Chapter model
     */
    readonly fields: ChapterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chapter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChapterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lessons<T extends Chapter$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Chapter$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Chapter model
   */
  export interface ChapterFieldRefs {
    readonly id: FieldRef<"Chapter", "String">;
    readonly title: FieldRef<"Chapter", "String">;
    readonly description: FieldRef<"Chapter", "String">;
    readonly courseId: FieldRef<"Chapter", "String">;
    readonly createdAt: FieldRef<"Chapter", "DateTime">;
    readonly updatedAt: FieldRef<"Chapter", "DateTime">;
    readonly isPublished: FieldRef<"Chapter", "Boolean">;
    readonly isFree: FieldRef<"Chapter", "Boolean">;
  }

  // Custom InputTypes
  /**
   * Chapter findUnique
   */
  export interface ChapterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * Filter, which Chapter to fetch.
     */
    where: ChapterWhereUniqueInput;
  }

  /**
   * Chapter findUniqueOrThrow
   */
  export interface ChapterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * Filter, which Chapter to fetch.
     */
    where: ChapterWhereUniqueInput;
  }

  /**
   * Chapter findFirst
   */
  export interface ChapterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * Filter, which Chapter to fetch.
     */
    where?: ChapterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Chapters.
     */
    cursor?: ChapterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chapters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Chapters.
     */
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[];
  }

  /**
   * Chapter findFirstOrThrow
   */
  export interface ChapterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * Filter, which Chapter to fetch.
     */
    where?: ChapterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Chapters.
     */
    cursor?: ChapterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chapters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Chapters.
     */
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[];
  }

  /**
   * Chapter findMany
   */
  export interface ChapterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * Filter, which Chapters to fetch.
     */
    where?: ChapterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chapters to fetch.
     */
    orderBy?: ChapterOrderByWithRelationInput | ChapterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Chapters.
     */
    cursor?: ChapterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chapters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chapters.
     */
    skip?: number;
    distinct?: ChapterScalarFieldEnum | ChapterScalarFieldEnum[];
  }

  /**
   * Chapter create
   */
  export interface ChapterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * The data needed to create a Chapter.
     */
    data: XOR<ChapterCreateInput, ChapterUncheckedCreateInput>;
  }

  /**
   * Chapter createMany
   */
  export interface ChapterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Chapters.
     */
    data: ChapterCreateManyInput | ChapterCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Chapter createManyAndReturn
   */
  export interface ChapterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * The data used to create many Chapters.
     */
    data: ChapterCreateManyInput | ChapterCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterIncludeCreateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Chapter update
   */
  export interface ChapterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * The data needed to update a Chapter.
     */
    data: XOR<ChapterUpdateInput, ChapterUncheckedUpdateInput>;
    /**
     * Choose, which Chapter to update.
     */
    where: ChapterWhereUniqueInput;
  }

  /**
   * Chapter updateMany
   */
  export interface ChapterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Chapters.
     */
    data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyInput>;
    /**
     * Filter which Chapters to update
     */
    where?: ChapterWhereInput;
    /**
     * Limit how many Chapters to update.
     */
    limit?: number;
  }

  /**
   * Chapter updateManyAndReturn
   */
  export interface ChapterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * The data used to update Chapters.
     */
    data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyInput>;
    /**
     * Filter which Chapters to update
     */
    where?: ChapterWhereInput;
    /**
     * Limit how many Chapters to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterIncludeUpdateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Chapter upsert
   */
  export interface ChapterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * The filter to search for the Chapter to update in case it exists.
     */
    where: ChapterWhereUniqueInput;
    /**
     * In case the Chapter found by the `where` argument doesn't exist, create a new Chapter with this data.
     */
    create: XOR<ChapterCreateInput, ChapterUncheckedCreateInput>;
    /**
     * In case the Chapter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChapterUpdateInput, ChapterUncheckedUpdateInput>;
  }

  /**
   * Chapter delete
   */
  export interface ChapterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
    /**
     * Filter which Chapter to delete.
     */
    where: ChapterWhereUniqueInput;
  }

  /**
   * Chapter deleteMany
   */
  export interface ChapterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Chapters to delete
     */
    where?: ChapterWhereInput;
    /**
     * Limit how many Chapters to delete.
     */
    limit?: number;
  }

  /**
   * Chapter.lessons
   */
  export interface Chapter$lessonsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    where?: LessonWhereInput;
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
    cursor?: LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
  }

  /**
   * Chapter without action
   */
  export interface ChapterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Chapter
     */
    select?: ChapterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chapter
     */
    omit?: ChapterOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapterInclude<ExtArgs> | null;
  }

  /**
   * Model Lesson
   */

  export interface AggregateLesson {
    _count: LessonCountAggregateOutputType | null;
    _avg: LessonAvgAggregateOutputType | null;
    _sum: LessonSumAggregateOutputType | null;
    _min: LessonMinAggregateOutputType | null;
    _max: LessonMaxAggregateOutputType | null;
  }

  export interface LessonAvgAggregateOutputType {
    position: number | null;
  }

  export interface LessonSumAggregateOutputType {
    position: number | null;
  }

  export interface LessonMinAggregateOutputType {
    id: string | null;
    title: string | null;
    content: string | null;
    chapterId: string | null;
    position: number | null;
    isPublished: boolean | null;
    isFree: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface LessonMaxAggregateOutputType {
    id: string | null;
    title: string | null;
    content: string | null;
    chapterId: string | null;
    position: number | null;
    isPublished: boolean | null;
    isFree: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface LessonCountAggregateOutputType {
    id: number;
    title: number;
    content: number;
    chapterId: number;
    position: number;
    isPublished: number;
    isFree: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  }

  export interface LessonAvgAggregateInputType {
    position?: true;
  }

  export interface LessonSumAggregateInputType {
    position?: true;
  }

  export interface LessonMinAggregateInputType {
    id?: true;
    title?: true;
    content?: true;
    chapterId?: true;
    position?: true;
    isPublished?: true;
    isFree?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface LessonMaxAggregateInputType {
    id?: true;
    title?: true;
    content?: true;
    chapterId?: true;
    position?: true;
    isPublished?: true;
    isFree?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface LessonCountAggregateInputType {
    id?: true;
    title?: true;
    content?: true;
    chapterId?: true;
    position?: true;
    isPublished?: true;
    isFree?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  }

  export interface LessonAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Lesson to aggregate.
     */
    where?: LessonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: LessonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lessons.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Lessons
     */
    _count?: true | LessonCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     */
    _avg?: LessonAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     */
    _sum?: LessonSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: LessonMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: LessonMaxAggregateInputType;
  }

  export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
    [P in keyof T & keyof AggregateLesson]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLesson[P]>
      : GetScalarType<T[P], AggregateLesson[P]>
  };

  export interface LessonGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: LessonWhereInput;
    orderBy?: LessonOrderByWithAggregationInput | LessonOrderByWithAggregationInput[];
    by: LessonScalarFieldEnum[] | LessonScalarFieldEnum;
    having?: LessonScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LessonCountAggregateInputType | true;
    _avg?: LessonAvgAggregateInputType;
    _sum?: LessonSumAggregateInputType;
    _min?: LessonMinAggregateInputType;
    _max?: LessonMaxAggregateInputType;
  }

  export interface LessonGroupByOutputType {
    id: string;
    title: string;
    content: string;
    chapterId: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: LessonCountAggregateOutputType | null;
    _avg: LessonAvgAggregateOutputType | null;
    _sum: LessonSumAggregateOutputType | null;
    _min: LessonMinAggregateOutputType | null;
    _max: LessonMaxAggregateOutputType | null;
  }

  type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], LessonGroupByOutputType[P]>
          : GetScalarType<T[P], LessonGroupByOutputType[P]>
      }
    >
  >;

  export type LessonSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    chapterId?: boolean;
    position?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    chapter?: boolean | ChapterDefaultArgs<ExtArgs>;
    progress?: boolean | Lesson$progressArgs<ExtArgs>;
    _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["lesson"]>;

  export type LessonSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    chapterId?: boolean;
    position?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    chapter?: boolean | ChapterDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["lesson"]>;

  export type LessonSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    chapterId?: boolean;
    position?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    chapter?: boolean | ChapterDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["lesson"]>;

  export interface LessonSelectScalar {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    chapterId?: boolean;
    position?: boolean;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }

  export type LessonOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "content" | "chapterId" | "position" | "isPublished" | "isFree" | "createdAt" | "updatedAt", ExtArgs["result"]["lesson"]>;
  export interface LessonInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    chapter?: boolean | ChapterDefaultArgs<ExtArgs>;
    progress?: boolean | Lesson$progressArgs<ExtArgs>;
    _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>;
  }
  export interface LessonIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    chapter?: boolean | ChapterDefaultArgs<ExtArgs>;
  }
  export interface LessonIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    chapter?: boolean | ChapterDefaultArgs<ExtArgs>;
  }

  export interface $LessonPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Lesson";
    objects: {
      chapter: Prisma.$ChapterPayload<ExtArgs>;
      progress: Prisma.$ProgressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      title: string;
      content: string;
      chapterId: string;
      position: number;
      isPublished: boolean;
      isFree: boolean;
      createdAt: Date;
      updatedAt: Date;
    }, ExtArgs["result"]["lesson"]>;
    composites: {};
  }

  export type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LessonPayload, S>;

  export type LessonCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<LessonFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: LessonCountAggregateInputType | true;
    };

  export interface LessonDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Lesson"]; meta: { name: "Lesson" } };
    /**
     * Find zero or one Lesson that matches the filter.
     * @param {LessonFindUniqueArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonFindUniqueArgs>(args: SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Lesson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonFindUniqueOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Lesson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonFindFirstArgs>(args?: SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Lesson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindFirstOrThrowArgs} args - Arguments to find a Lesson
     * @example
     * // Get one Lesson
     * const lesson = await prisma.lesson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lessons
     * const lessons = await prisma.lesson.findMany()
     *
     * // Get first 10 Lessons
     * const lessons = await prisma.lesson.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const lessonWithIdOnly = await prisma.lesson.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LessonFindManyArgs>(args?: SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Lesson.
     * @param {LessonCreateArgs} args - Arguments to create a Lesson.
     * @example
     * // Create one Lesson
     * const Lesson = await prisma.lesson.create({
     *   data: {
     *     // ... data to create a Lesson
     *   }
     * })
     *
     */
    create<T extends LessonCreateArgs>(args: SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Lessons.
     * @param {LessonCreateManyArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LessonCreateManyArgs>(args?: SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Lessons and returns the data saved in the database.
     * @param {LessonCreateManyAndReturnArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lesson = await prisma.lesson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Lessons and only return the `id`
     * const lessonWithIdOnly = await prisma.lesson.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Lesson.
     * @param {LessonDeleteArgs} args - Arguments to delete one Lesson.
     * @example
     * // Delete one Lesson
     * const Lesson = await prisma.lesson.delete({
     *   where: {
     *     // ... filter to delete one Lesson
     *   }
     * })
     *
     */
    delete<T extends LessonDeleteArgs>(args: SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Lesson.
     * @param {LessonUpdateArgs} args - Arguments to update one Lesson.
     * @example
     * // Update one Lesson
     * const lesson = await prisma.lesson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LessonUpdateArgs>(args: SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Lessons.
     * @param {LessonDeleteManyArgs} args - Arguments to filter Lessons to delete.
     * @example
     * // Delete a few Lessons
     * const { count } = await prisma.lesson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LessonDeleteManyArgs>(args?: SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LessonUpdateManyArgs>(args: SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Lessons and returns the data updated in the database.
     * @param {LessonUpdateManyAndReturnArgs} args - Arguments to update many Lessons.
     * @example
     * // Update many Lessons
     * const lesson = await prisma.lesson.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Lessons and only return the `id`
     * const lessonWithIdOnly = await prisma.lesson.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends LessonUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Lesson.
     * @param {LessonUpsertArgs} args - Arguments to update or create a Lesson.
     * @example
     * // Update or create a Lesson
     * const lesson = await prisma.lesson.upsert({
     *   create: {
     *     // ... data to create a Lesson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lesson we want to update
     *   }
     * })
     */
    upsert<T extends LessonUpsertArgs>(args: SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonCountArgs} args - Arguments to filter Lessons to count.
     * @example
     * // Count the number of Lessons
     * const count = await prisma.lesson.count({
     *   where: {
     *     // ... the filter for the Lessons we want to count
     *   }
     * })
     */
    count<T extends LessonCountArgs>(
      args?: Subset<T, LessonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], LessonCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends LessonAggregateArgs>(args: Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>;

    /**
     * Group by Lesson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends LessonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonGroupByArgs["orderBy"] }
        : { orderBy?: LessonGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Lesson model
     */
    readonly fields: LessonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lesson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chapter<T extends ChapterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChapterDefaultArgs<ExtArgs>>): Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    progress<T extends Lesson$progressArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$progressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Lesson model
   */
  export interface LessonFieldRefs {
    readonly id: FieldRef<"Lesson", "String">;
    readonly title: FieldRef<"Lesson", "String">;
    readonly content: FieldRef<"Lesson", "String">;
    readonly chapterId: FieldRef<"Lesson", "String">;
    readonly position: FieldRef<"Lesson", "Int">;
    readonly isPublished: FieldRef<"Lesson", "Boolean">;
    readonly isFree: FieldRef<"Lesson", "Boolean">;
    readonly createdAt: FieldRef<"Lesson", "DateTime">;
    readonly updatedAt: FieldRef<"Lesson", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Lesson findUnique
   */
  export interface LessonFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput;
  }

  /**
   * Lesson findUniqueOrThrow
   */
  export interface LessonFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * Filter, which Lesson to fetch.
     */
    where: LessonWhereUniqueInput;
  }

  /**
   * Lesson findFirst
   */
  export interface LessonFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lessons.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
  }

  /**
   * Lesson findFirstOrThrow
   */
  export interface LessonFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * Filter, which Lesson to fetch.
     */
    where?: LessonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lessons.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
  }

  /**
   * Lesson findMany
   */
  export interface LessonFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Lessons.
     */
    cursor?: LessonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lessons.
     */
    skip?: number;
    distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
  }

  /**
   * Lesson create
   */
  export interface LessonCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * The data needed to create a Lesson.
     */
    data: XOR<LessonCreateInput, LessonUncheckedCreateInput>;
  }

  /**
   * Lesson createMany
   */
  export interface LessonCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Lesson createManyAndReturn
   */
  export interface LessonCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * The data used to create many Lessons.
     */
    data: LessonCreateManyInput | LessonCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonIncludeCreateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Lesson update
   */
  export interface LessonUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * The data needed to update a Lesson.
     */
    data: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>;
    /**
     * Choose, which Lesson to update.
     */
    where: LessonWhereUniqueInput;
  }

  /**
   * Lesson updateMany
   */
  export interface LessonUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>;
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput;
    /**
     * Limit how many Lessons to update.
     */
    limit?: number;
  }

  /**
   * Lesson updateManyAndReturn
   */
  export interface LessonUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>;
    /**
     * Filter which Lessons to update
     */
    where?: LessonWhereInput;
    /**
     * Limit how many Lessons to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonIncludeUpdateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Lesson upsert
   */
  export interface LessonUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * The filter to search for the Lesson to update in case it exists.
     */
    where: LessonWhereUniqueInput;
    /**
     * In case the Lesson found by the `where` argument doesn't exist, create a new Lesson with this data.
     */
    create: XOR<LessonCreateInput, LessonUncheckedCreateInput>;
    /**
     * In case the Lesson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>;
  }

  /**
   * Lesson delete
   */
  export interface LessonDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
    /**
     * Filter which Lesson to delete.
     */
    where: LessonWhereUniqueInput;
  }

  /**
   * Lesson deleteMany
   */
  export interface LessonDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Lessons to delete
     */
    where?: LessonWhereInput;
    /**
     * Limit how many Lessons to delete.
     */
    limit?: number;
  }

  /**
   * Lesson.progress
   */
  export interface Lesson$progressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    where?: ProgressWhereInput;
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[];
    cursor?: ProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[];
  }

  /**
   * Lesson without action
   */
  export interface LessonDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Lesson
     */
    select?: LessonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lesson
     */
    omit?: LessonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonInclude<ExtArgs> | null;
  }

  /**
   * Model Progress
   */

  export interface AggregateProgress {
    _count: ProgressCountAggregateOutputType | null;
    _min: ProgressMinAggregateOutputType | null;
    _max: ProgressMaxAggregateOutputType | null;
  }

  export interface ProgressMinAggregateOutputType {
    id: string | null;
    userId: string | null;
    lessonId: string | null;
    courseId: string | null;
    completed: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface ProgressMaxAggregateOutputType {
    id: string | null;
    userId: string | null;
    lessonId: string | null;
    courseId: string | null;
    completed: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface ProgressCountAggregateOutputType {
    id: number;
    userId: number;
    lessonId: number;
    courseId: number;
    completed: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  }

  export interface ProgressMinAggregateInputType {
    id?: true;
    userId?: true;
    lessonId?: true;
    courseId?: true;
    completed?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface ProgressMaxAggregateInputType {
    id?: true;
    userId?: true;
    lessonId?: true;
    courseId?: true;
    completed?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface ProgressCountAggregateInputType {
    id?: true;
    userId?: true;
    lessonId?: true;
    courseId?: true;
    completed?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  }

  export interface ProgressAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Progress to aggregate.
     */
    where?: ProgressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProgressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Progresses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Progresses
     */
    _count?: true | ProgressCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: ProgressMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: ProgressMaxAggregateInputType;
  }

  export type GetProgressAggregateType<T extends ProgressAggregateArgs> = {
    [P in keyof T & keyof AggregateProgress]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgress[P]>
      : GetScalarType<T[P], AggregateProgress[P]>
  };

  export interface ProgressGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: ProgressWhereInput;
    orderBy?: ProgressOrderByWithAggregationInput | ProgressOrderByWithAggregationInput[];
    by: ProgressScalarFieldEnum[] | ProgressScalarFieldEnum;
    having?: ProgressScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProgressCountAggregateInputType | true;
    _min?: ProgressMinAggregateInputType;
    _max?: ProgressMaxAggregateInputType;
  }

  export interface ProgressGroupByOutputType {
    id: string;
    userId: string;
    lessonId: string;
    courseId: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProgressCountAggregateOutputType | null;
    _min: ProgressMinAggregateOutputType | null;
    _max: ProgressMaxAggregateOutputType | null;
  }

  type GetProgressGroupByPayload<T extends ProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgressGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof ProgressGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ProgressGroupByOutputType[P]>
          : GetScalarType<T[P], ProgressGroupByOutputType[P]>
      }
    >
  >;

  export type ProgressSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    lessonId?: boolean;
    courseId?: boolean;
    completed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["progress"]>;

  export type ProgressSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    lessonId?: boolean;
    courseId?: boolean;
    completed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["progress"]>;

  export type ProgressSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    lessonId?: boolean;
    courseId?: boolean;
    completed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["progress"]>;

  export interface ProgressSelectScalar {
    id?: boolean;
    userId?: boolean;
    lessonId?: boolean;
    courseId?: boolean;
    completed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }

  export type ProgressOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "lessonId" | "courseId" | "completed" | "createdAt" | "updatedAt", ExtArgs["result"]["progress"]>;
  export interface ProgressInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }
  export interface ProgressIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }
  export interface ProgressIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    course?: boolean | CourseDefaultArgs<ExtArgs>;
  }

  export interface $ProgressPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Progress";
    objects: {
      lesson: Prisma.$LessonPayload<ExtArgs>;
      course: Prisma.$CoursePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      userId: string;
      lessonId: string;
      courseId: string;
      completed: boolean;
      createdAt: Date;
      updatedAt: Date;
    }, ExtArgs["result"]["progress"]>;
    composites: {};
  }

  export type ProgressGetPayload<S extends boolean | null | undefined | ProgressDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProgressPayload, S>;

  export type ProgressCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<ProgressFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: ProgressCountAggregateInputType | true;
    };

  export interface ProgressDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Progress"]; meta: { name: "Progress" } };
    /**
     * Find zero or one Progress that matches the filter.
     * @param {ProgressFindUniqueArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgressFindUniqueArgs>(args: SelectSubset<T, ProgressFindUniqueArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Progress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgressFindUniqueOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Progress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgressFindFirstArgs>(args?: SelectSubset<T, ProgressFindFirstArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Progress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Progresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Progresses
     * const progresses = await prisma.progress.findMany()
     *
     * // Get first 10 Progresses
     * const progresses = await prisma.progress.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const progressWithIdOnly = await prisma.progress.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProgressFindManyArgs>(args?: SelectSubset<T, ProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Progress.
     * @param {ProgressCreateArgs} args - Arguments to create a Progress.
     * @example
     * // Create one Progress
     * const Progress = await prisma.progress.create({
     *   data: {
     *     // ... data to create a Progress
     *   }
     * })
     *
     */
    create<T extends ProgressCreateArgs>(args: SelectSubset<T, ProgressCreateArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Progresses.
     * @param {ProgressCreateManyArgs} args - Arguments to create many Progresses.
     * @example
     * // Create many Progresses
     * const progress = await prisma.progress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProgressCreateManyArgs>(args?: SelectSubset<T, ProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Progresses and returns the data saved in the database.
     * @param {ProgressCreateManyAndReturnArgs} args - Arguments to create many Progresses.
     * @example
     * // Create many Progresses
     * const progress = await prisma.progress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Progresses and only return the `id`
     * const progressWithIdOnly = await prisma.progress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Progress.
     * @param {ProgressDeleteArgs} args - Arguments to delete one Progress.
     * @example
     * // Delete one Progress
     * const Progress = await prisma.progress.delete({
     *   where: {
     *     // ... filter to delete one Progress
     *   }
     * })
     *
     */
    delete<T extends ProgressDeleteArgs>(args: SelectSubset<T, ProgressDeleteArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Progress.
     * @param {ProgressUpdateArgs} args - Arguments to update one Progress.
     * @example
     * // Update one Progress
     * const progress = await prisma.progress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProgressUpdateArgs>(args: SelectSubset<T, ProgressUpdateArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Progresses.
     * @param {ProgressDeleteManyArgs} args - Arguments to filter Progresses to delete.
     * @example
     * // Delete a few Progresses
     * const { count } = await prisma.progress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProgressDeleteManyArgs>(args?: SelectSubset<T, ProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProgressUpdateManyArgs>(args: SelectSubset<T, ProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Progresses and returns the data updated in the database.
     * @param {ProgressUpdateManyAndReturnArgs} args - Arguments to update many Progresses.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Progresses and only return the `id`
     * const progressWithIdOnly = await prisma.progress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Progress.
     * @param {ProgressUpsertArgs} args - Arguments to update or create a Progress.
     * @example
     * // Update or create a Progress
     * const progress = await prisma.progress.upsert({
     *   create: {
     *     // ... data to create a Progress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Progress we want to update
     *   }
     * })
     */
    upsert<T extends ProgressUpsertArgs>(args: SelectSubset<T, ProgressUpsertArgs<ExtArgs>>): Prisma__ProgressClient<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressCountArgs} args - Arguments to filter Progresses to count.
     * @example
     * // Count the number of Progresses
     * const count = await prisma.progress.count({
     *   where: {
     *     // ... the filter for the Progresses we want to count
     *   }
     * })
     */
    count<T extends ProgressCountArgs>(
      args?: Subset<T, ProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProgressCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends ProgressAggregateArgs>(args: Subset<T, ProgressAggregateArgs>): Prisma.PrismaPromise<GetProgressAggregateType<T>>;

    /**
     * Group by Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends ProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgressGroupByArgs["orderBy"] }
        : { orderBy?: ProgressGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, ProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Progress model
     */
    readonly fields: ProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Progress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgressClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lesson<T extends LessonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LessonDefaultArgs<ExtArgs>>): Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Progress model
   */
  export interface ProgressFieldRefs {
    readonly id: FieldRef<"Progress", "String">;
    readonly userId: FieldRef<"Progress", "String">;
    readonly lessonId: FieldRef<"Progress", "String">;
    readonly courseId: FieldRef<"Progress", "String">;
    readonly completed: FieldRef<"Progress", "Boolean">;
    readonly createdAt: FieldRef<"Progress", "DateTime">;
    readonly updatedAt: FieldRef<"Progress", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Progress findUnique
   */
  export interface ProgressFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput;
  }

  /**
   * Progress findUniqueOrThrow
   */
  export interface ProgressFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput;
  }

  /**
   * Progress findFirst
   */
  export interface ProgressFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Progresses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Progresses.
     */
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[];
  }

  /**
   * Progress findFirstOrThrow
   */
  export interface ProgressFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Progresses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Progresses.
     */
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[];
  }

  /**
   * Progress findMany
   */
  export interface ProgressFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * Filter, which Progresses to fetch.
     */
    where?: ProgressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Progresses.
     */
    cursor?: ProgressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Progresses.
     */
    skip?: number;
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[];
  }

  /**
   * Progress create
   */
  export interface ProgressCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * The data needed to create a Progress.
     */
    data: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>;
  }

  /**
   * Progress createMany
   */
  export interface ProgressCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Progresses.
     */
    data: ProgressCreateManyInput | ProgressCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Progress createManyAndReturn
   */
  export interface ProgressCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * The data used to create many Progresses.
     */
    data: ProgressCreateManyInput | ProgressCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressIncludeCreateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Progress update
   */
  export interface ProgressUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * The data needed to update a Progress.
     */
    data: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>;
    /**
     * Choose, which Progress to update.
     */
    where: ProgressWhereUniqueInput;
  }

  /**
   * Progress updateMany
   */
  export interface ProgressUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>;
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput;
    /**
     * Limit how many Progresses to update.
     */
    limit?: number;
  }

  /**
   * Progress updateManyAndReturn
   */
  export interface ProgressUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>;
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput;
    /**
     * Limit how many Progresses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressIncludeUpdateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Progress upsert
   */
  export interface ProgressUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * The filter to search for the Progress to update in case it exists.
     */
    where: ProgressWhereUniqueInput;
    /**
     * In case the Progress found by the `where` argument doesn't exist, create a new Progress with this data.
     */
    create: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>;
    /**
     * In case the Progress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>;
  }

  /**
   * Progress delete
   */
  export interface ProgressDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
    /**
     * Filter which Progress to delete.
     */
    where: ProgressWhereUniqueInput;
  }

  /**
   * Progress deleteMany
   */
  export interface ProgressDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Progresses to delete
     */
    where?: ProgressWhereInput;
    /**
     * Limit how many Progresses to delete.
     */
    limit?: number;
  }

  /**
   * Progress without action
   */
  export interface ProgressDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null;
  }

  /**
   * Model Session
   */

  export interface AggregateSession {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  }

  export interface SessionMinAggregateOutputType {
    id: string | null;
    expiresAt: Date | null;
    token: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string | null;
    impersonatedBy: string | null;
  }

  export interface SessionMaxAggregateOutputType {
    id: string | null;
    expiresAt: Date | null;
    token: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string | null;
    impersonatedBy: string | null;
  }

  export interface SessionCountAggregateOutputType {
    id: number;
    expiresAt: number;
    token: number;
    createdAt: number;
    updatedAt: number;
    ipAddress: number;
    userAgent: number;
    userId: number;
    impersonatedBy: number;
    _all: number;
  }

  export interface SessionMinAggregateInputType {
    id?: true;
    expiresAt?: true;
    token?: true;
    createdAt?: true;
    updatedAt?: true;
    ipAddress?: true;
    userAgent?: true;
    userId?: true;
    impersonatedBy?: true;
  }

  export interface SessionMaxAggregateInputType {
    id?: true;
    expiresAt?: true;
    token?: true;
    createdAt?: true;
    updatedAt?: true;
    ipAddress?: true;
    userAgent?: true;
    userId?: true;
    impersonatedBy?: true;
  }

  export interface SessionCountAggregateInputType {
    id?: true;
    expiresAt?: true;
    token?: true;
    createdAt?: true;
    updatedAt?: true;
    ipAddress?: true;
    userAgent?: true;
    userId?: true;
    impersonatedBy?: true;
    _all?: true;
  }

  export interface SessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     */
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: SessionMaxAggregateInputType;
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  };

  export interface SessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: SessionWhereInput;
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  }

  export interface SessionGroupByOutputType {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string;
    impersonatedBy: string | null;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
          : GetScalarType<T[P], SessionGroupByOutputType[P]>
      }
    >
  >;

  export type SessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    expiresAt?: boolean;
    token?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    userId?: boolean;
    impersonatedBy?: boolean;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["session"]>;

  export type SessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    expiresAt?: boolean;
    token?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    userId?: boolean;
    impersonatedBy?: boolean;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["session"]>;

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    expiresAt?: boolean;
    token?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    userId?: boolean;
    impersonatedBy?: boolean;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["session"]>;

  export interface SessionSelectScalar {
    id?: boolean;
    expiresAt?: boolean;
    token?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    userId?: boolean;
    impersonatedBy?: boolean;
  }

  export type SessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId" | "impersonatedBy", ExtArgs["result"]["session"]>;
  export interface SessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }
  export interface SessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }
  export interface SessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }

  export interface $SessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Session";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      expiresAt: Date;
      token: string;
      createdAt: Date;
      updatedAt: Date;
      ipAddress: string | null;
      userAgent: string | null;
      userId: string;
      impersonatedBy: string | null;
    }, ExtArgs["result"]["session"]>;
    composites: {};
  }

  export type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SessionPayload, S>;

  export type SessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: SessionCountAggregateInputType | true;
    };

  export interface SessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Session"]; meta: { name: "Session" } };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     */
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs["orderBy"] }
        : { orderBy?: SessionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  export interface SessionFieldRefs {
    readonly id: FieldRef<"Session", "String">;
    readonly expiresAt: FieldRef<"Session", "DateTime">;
    readonly token: FieldRef<"Session", "String">;
    readonly createdAt: FieldRef<"Session", "DateTime">;
    readonly updatedAt: FieldRef<"Session", "DateTime">;
    readonly ipAddress: FieldRef<"Session", "String">;
    readonly userAgent: FieldRef<"Session", "String">;
    readonly userId: FieldRef<"Session", "String">;
    readonly impersonatedBy: FieldRef<"Session", "String">;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export interface SessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  }

  /**
   * Session findUniqueOrThrow
   */
  export interface SessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  }

  /**
   * Session findFirst
   */
  export interface SessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  }

  /**
   * Session findFirstOrThrow
   */
  export interface SessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  }

  /**
   * Session findMany
   */
  export interface SessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  }

  /**
   * Session create
   */
  export interface SessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  }

  /**
   * Session createMany
   */
  export interface SessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Session createManyAndReturn
   */
  export interface SessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Session update
   */
  export interface SessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  }

  /**
   * Session updateMany
   */
  export interface SessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
  }

  /**
   * Session updateManyAndReturn
   */
  export interface SessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Session upsert
   */
  export interface SessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  }

  /**
   * Session delete
   */
  export interface SessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  }

  /**
   * Session deleteMany
   */
  export interface SessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number;
  }

  /**
   * Session without action
   */
  export interface SessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  }

  /**
   * Model Account
   */

  export interface AggregateAccount {
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  }

  export interface AccountMinAggregateOutputType {
    id: string | null;
    accountId: string | null;
    providerId: string | null;
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface AccountMaxAggregateOutputType {
    id: string | null;
    accountId: string | null;
    providerId: string | null;
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface AccountCountAggregateOutputType {
    id: number;
    accountId: number;
    providerId: number;
    userId: number;
    accessToken: number;
    refreshToken: number;
    idToken: number;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    scope: number;
    password: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  }

  export interface AccountMinAggregateInputType {
    id?: true;
    accountId?: true;
    providerId?: true;
    userId?: true;
    accessToken?: true;
    refreshToken?: true;
    idToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    scope?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface AccountMaxAggregateInputType {
    id?: true;
    accountId?: true;
    providerId?: true;
    userId?: true;
    accessToken?: true;
    refreshToken?: true;
    idToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    scope?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface AccountCountAggregateInputType {
    id?: true;
    accountId?: true;
    providerId?: true;
    userId?: true;
    accessToken?: true;
    refreshToken?: true;
    idToken?: true;
    accessTokenExpiresAt?: true;
    refreshTokenExpiresAt?: true;
    scope?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  }

  export interface AccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Accounts
     */
    _count?: true | AccountCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: AccountMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: AccountMaxAggregateInputType;
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  };

  export interface AccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: AccountWhereInput;
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[];
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
    having?: AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
  }

  export interface AccountGroupByOutputType {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AccountCountAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
          : GetScalarType<T[P], AccountGroupByOutputType[P]>
      }
    >
  >;

  export type AccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    providerId?: boolean;
    userId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    idToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    scope?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["account"]>;

  export type AccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    providerId?: boolean;
    userId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    idToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    scope?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["account"]>;

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    accountId?: boolean;
    providerId?: boolean;
    userId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    idToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    scope?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }, ExtArgs["result"]["account"]>;

  export interface AccountSelectScalar {
    id?: boolean;
    accountId?: boolean;
    providerId?: boolean;
    userId?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    idToken?: boolean;
    accessTokenExpiresAt?: boolean;
    refreshTokenExpiresAt?: boolean;
    scope?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }

  export type AccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>;
  export interface AccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }
  export interface AccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }
  export interface AccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  }

  export interface $AccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Account";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      accountId: string;
      providerId: string;
      userId: string;
      accessToken: string | null;
      refreshToken: string | null;
      idToken: string | null;
      accessTokenExpiresAt: Date | null;
      refreshTokenExpiresAt: Date | null;
      scope: string | null;
      password: string | null;
      createdAt: Date;
      updatedAt: Date;
    }, ExtArgs["result"]["account"]>;
    composites: {};
  }

  export type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AccountPayload, S>;

  export type AccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: AccountCountAggregateInputType | true;
    };

  export interface AccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Account"]; meta: { name: "Account" } };
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     *
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     *
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     *
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<runtime.Types.Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
     */
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AccountCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs["orderBy"] }
        : { orderBy?: AccountGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Account model
     */
    readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Account model
   */
  export interface AccountFieldRefs {
    readonly id: FieldRef<"Account", "String">;
    readonly accountId: FieldRef<"Account", "String">;
    readonly providerId: FieldRef<"Account", "String">;
    readonly userId: FieldRef<"Account", "String">;
    readonly accessToken: FieldRef<"Account", "String">;
    readonly refreshToken: FieldRef<"Account", "String">;
    readonly idToken: FieldRef<"Account", "String">;
    readonly accessTokenExpiresAt: FieldRef<"Account", "DateTime">;
    readonly refreshTokenExpiresAt: FieldRef<"Account", "DateTime">;
    readonly scope: FieldRef<"Account", "String">;
    readonly password: FieldRef<"Account", "String">;
    readonly createdAt: FieldRef<"Account", "DateTime">;
    readonly updatedAt: FieldRef<"Account", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export interface AccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  }

  /**
   * Account findUniqueOrThrow
   */
  export interface AccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  }

  /**
   * Account findFirst
   */
  export interface AccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  }

  /**
   * Account findFirstOrThrow
   */
  export interface AccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  }

  /**
   * Account findMany
   */
  export interface AccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  }

  /**
   * Account create
   */
  export interface AccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
  }

  /**
   * Account createMany
   */
  export interface AccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Account createManyAndReturn
   */
  export interface AccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Account update
   */
  export interface AccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput;
  }

  /**
   * Account updateMany
   */
  export interface AccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
  }

  /**
   * Account updateManyAndReturn
   */
  export interface AccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
  }

  /**
   * Account upsert
   */
  export interface AccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput;
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
  }

  /**
   * Account delete
   */
  export interface AccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput;
  }

  /**
   * Account deleteMany
   */
  export interface AccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number;
  }

  /**
   * Account without action
   */
  export interface AccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
  }

  /**
   * Model Verification
   */

  export interface AggregateVerification {
    _count: VerificationCountAggregateOutputType | null;
    _min: VerificationMinAggregateOutputType | null;
    _max: VerificationMaxAggregateOutputType | null;
  }

  export interface VerificationMinAggregateOutputType {
    id: string | null;
    identifier: string | null;
    value: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface VerificationMaxAggregateOutputType {
    id: string | null;
    identifier: string | null;
    value: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface VerificationCountAggregateOutputType {
    id: number;
    identifier: number;
    value: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  }

  export interface VerificationMinAggregateInputType {
    id?: true;
    identifier?: true;
    value?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface VerificationMaxAggregateInputType {
    id?: true;
    identifier?: true;
    value?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
  }

  export interface VerificationCountAggregateInputType {
    id?: true;
    identifier?: true;
    value?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  }

  export interface VerificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Verifications
     */
    _count?: true | VerificationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: VerificationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: VerificationMaxAggregateInputType;
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
    [P in keyof T & keyof AggregateVerification]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  };

  export interface VerificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    where?: VerificationWhereInput;
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[];
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum;
    having?: VerificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationCountAggregateInputType | true;
    _min?: VerificationMinAggregateInputType;
    _max?: VerificationMaxAggregateInputType;
  }

  export interface VerificationGroupByOutputType {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt: Date | null;
    updatedAt: Date | null;
    _count: VerificationCountAggregateOutputType | null;
    _min: VerificationMinAggregateOutputType | null;
    _max: VerificationMaxAggregateOutputType | null;
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T["by"]> &
      {
        [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
          : GetScalarType<T[P], VerificationGroupByOutputType[P]>
      }
    >
  >;

  export type VerificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    identifier?: boolean;
    value?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }, ExtArgs["result"]["verification"]>;

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    identifier?: boolean;
    value?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }, ExtArgs["result"]["verification"]>;

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    identifier?: boolean;
    value?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }, ExtArgs["result"]["verification"]>;

  export interface VerificationSelectScalar {
    id?: boolean;
    identifier?: boolean;
    value?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  }

  export type VerificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>;

  export interface $VerificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    name: "Verification";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string;
      identifier: string;
      value: string;
      expiresAt: Date;
      createdAt: Date | null;
      updatedAt: Date | null;
    }, ExtArgs["result"]["verification"]>;
    composites: {};
  }

  export type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VerificationPayload, S>;

  export type VerificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
      select?: VerificationCountAggregateInputType | true;
    };

  export interface VerificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Verification"]; meta: { name: "Verification" } };
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     *
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     *
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     *
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<runtime.Types.Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;

    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
     */
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], VerificationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>;

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     */
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs["orderBy"] }
        : { orderBy?: VerificationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ]
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
              : "Error: If you provide \"take\", you also need to provide \"orderBy\""
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                    }[OrderFields]
                : "Error: If you provide \"skip\", you also need to provide \"orderBy\""
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Verification model
     */
    readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Verification model
   */
  export interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", "String">;
    readonly identifier: FieldRef<"Verification", "String">;
    readonly value: FieldRef<"Verification", "String">;
    readonly expiresAt: FieldRef<"Verification", "DateTime">;
    readonly createdAt: FieldRef<"Verification", "DateTime">;
    readonly updatedAt: FieldRef<"Verification", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export interface VerificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput;
  }

  /**
   * Verification findUniqueOrThrow
   */
  export interface VerificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput;
  }

  /**
   * Verification findFirst
   */
  export interface VerificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[];
  }

  /**
   * Verification findFirstOrThrow
   */
  export interface VerificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[];
  }

  /**
   * Verification findMany
   */
  export interface VerificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Verifications.
     */
    skip?: number;
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[];
  }

  /**
   * Verification create
   */
  export interface VerificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>;
  }

  /**
   * Verification createMany
   */
  export interface VerificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Verification createManyAndReturn
   */
  export interface VerificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[];
    skipDuplicates?: boolean;
  }

  /**
   * Verification update
   */
  export interface VerificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>;
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput;
  }

  /**
   * Verification updateMany
   */
  export interface VerificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>;
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput;
    /**
     * Limit how many Verifications to update.
     */
    limit?: number;
  }

  /**
   * Verification updateManyAndReturn
   */
  export interface VerificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>;
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput;
    /**
     * Limit how many Verifications to update.
     */
    limit?: number;
  }

  /**
   * Verification upsert
   */
  export interface VerificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput;
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>;
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>;
  }

  /**
   * Verification delete
   */
  export interface VerificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput;
  }

  /**
   * Verification deleteMany
   */
  export interface VerificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput;
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number;
  }

  /**
   * Verification without action
   */
  export interface VerificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null;
  }

  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: "ReadUncommitted",
    ReadCommitted: "ReadCommitted",
    RepeatableRead: "RepeatableRead",
    Serializable: "Serializable",
  } as const);

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum = {
    id: "id",
    email: "email",
    name: "name",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    emailVerified: "emailVerified",
    image: "image",
    roles: "roles",
    role: "role",
    banned: "banned",
    banReason: "banReason",
    banExpires: "banExpires",
  } as const;

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const CourseScalarFieldEnum = {
    id: "id",
    title: "title",
    description: "description",
    tags: "tags",
    coverImage: "coverImage",
    price: "price",
    isPublished: "isPublished",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    productId: "productId",
    ownerId: "ownerId",
  } as const;

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];

  export const ChapterScalarFieldEnum = {
    id: "id",
    title: "title",
    description: "description",
    courseId: "courseId",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    isPublished: "isPublished",
    isFree: "isFree",
  } as const;

  export type ChapterScalarFieldEnum = (typeof ChapterScalarFieldEnum)[keyof typeof ChapterScalarFieldEnum];

  export const LessonScalarFieldEnum = {
    id: "id",
    title: "title",
    content: "content",
    chapterId: "chapterId",
    position: "position",
    isPublished: "isPublished",
    isFree: "isFree",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  } as const;

  export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum];

  export const ProgressScalarFieldEnum = {
    id: "id",
    userId: "userId",
    lessonId: "lessonId",
    courseId: "courseId",
    completed: "completed",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  } as const;

  export type ProgressScalarFieldEnum = (typeof ProgressScalarFieldEnum)[keyof typeof ProgressScalarFieldEnum];

  export const SessionScalarFieldEnum = {
    id: "id",
    expiresAt: "expiresAt",
    token: "token",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    ipAddress: "ipAddress",
    userAgent: "userAgent",
    userId: "userId",
    impersonatedBy: "impersonatedBy",
  } as const;

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const AccountScalarFieldEnum = {
    id: "id",
    accountId: "accountId",
    providerId: "providerId",
    userId: "userId",
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    idToken: "idToken",
    accessTokenExpiresAt: "accessTokenExpiresAt",
    refreshTokenExpiresAt: "refreshTokenExpiresAt",
    scope: "scope",
    password: "password",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  } as const;

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

  export const VerificationScalarFieldEnum = {
    id: "id",
    identifier: "identifier",
    value: "value",
    expiresAt: "expiresAt",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  } as const;

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];

  export const SortOrder = {
    asc: "asc",
    desc: "desc",
  } as const;

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode = {
    default: "default",
    insensitive: "insensitive",
  } as const;

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder = {
    first: "first",
    last: "last",
  } as const;

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "String">;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "String[]">;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "DateTime">;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "DateTime[]">;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Boolean">;

  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Role[]">;

  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Role">;

  /**
   * Reference to a field of type 'CourseTag[]'
   */
  export type ListEnumCourseTagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "CourseTag[]">;

  /**
   * Reference to a field of type 'CourseTag'
   */
  export type EnumCourseTagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "CourseTag">;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Float">;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Float[]">;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int">;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int[]">;

  /**
   * Deep Input Types
   */

  export interface UserWhereInput {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    name?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    emailVerified?: BoolFilter<"User"> | boolean;
    image?: StringNullableFilter<"User"> | string | null;
    roles?: EnumRoleNullableListFilter<"User">;
    role?: StringNullableFilter<"User"> | string | null;
    banned?: BoolNullableFilter<"User"> | boolean | null;
    banReason?: StringNullableFilter<"User"> | string | null;
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null;
    ownedCourses?: CourseListRelationFilter;
    enrolledCourses?: CourseListRelationFilter;
    sessions?: SessionListRelationFilter;
    accounts?: AccountListRelationFilter;
  }

  export interface UserOrderByWithRelationInput {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrderInput | SortOrder;
    roles?: SortOrder;
    role?: SortOrderInput | SortOrder;
    banned?: SortOrderInput | SortOrder;
    banReason?: SortOrderInput | SortOrder;
    banExpires?: SortOrderInput | SortOrder;
    ownedCourses?: CourseOrderByRelationAggregateInput;
    enrolledCourses?: CourseOrderByRelationAggregateInput;
    sessions?: SessionOrderByRelationAggregateInput;
    accounts?: AccountOrderByRelationAggregateInput;
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    name?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    emailVerified?: BoolFilter<"User"> | boolean;
    image?: StringNullableFilter<"User"> | string | null;
    roles?: EnumRoleNullableListFilter<"User">;
    role?: StringNullableFilter<"User"> | string | null;
    banned?: BoolNullableFilter<"User"> | boolean | null;
    banReason?: StringNullableFilter<"User"> | string | null;
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null;
    ownedCourses?: CourseListRelationFilter;
    enrolledCourses?: CourseListRelationFilter;
    sessions?: SessionListRelationFilter;
    accounts?: AccountListRelationFilter;
  }, "id" | "email">;

  export interface UserOrderByWithAggregationInput {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrderInput | SortOrder;
    roles?: SortOrder;
    role?: SortOrderInput | SortOrder;
    banned?: SortOrderInput | SortOrder;
    banReason?: SortOrderInput | SortOrder;
    banExpires?: SortOrderInput | SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  }

  export interface UserScalarWhereWithAggregatesInput {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    name?: StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean;
    image?: StringNullableWithAggregatesFilter<"User"> | string | null;
    roles?: EnumRoleNullableListFilter<"User">;
    role?: StringNullableWithAggregatesFilter<"User"> | string | null;
    banned?: BoolNullableWithAggregatesFilter<"User"> | boolean | null;
    banReason?: StringNullableWithAggregatesFilter<"User"> | string | null;
    banExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
  }

  export interface CourseWhereInput {
    AND?: CourseWhereInput | CourseWhereInput[];
    OR?: CourseWhereInput[];
    NOT?: CourseWhereInput | CourseWhereInput[];
    id?: StringFilter<"Course"> | string;
    title?: StringFilter<"Course"> | string;
    description?: StringFilter<"Course"> | string;
    tags?: EnumCourseTagNullableListFilter<"Course">;
    coverImage?: StringNullableFilter<"Course"> | string | null;
    price?: FloatFilter<"Course"> | number;
    isPublished?: BoolFilter<"Course"> | boolean;
    createdAt?: DateTimeFilter<"Course"> | Date | string;
    updatedAt?: DateTimeFilter<"Course"> | Date | string;
    productId?: StringNullableFilter<"Course"> | string | null;
    ownerId?: StringFilter<"Course"> | string;
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>;
    students?: UserListRelationFilter;
    chapters?: ChapterListRelationFilter;
    progress?: ProgressListRelationFilter;
  }

  export interface CourseOrderByWithRelationInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    tags?: SortOrder;
    coverImage?: SortOrderInput | SortOrder;
    price?: SortOrder;
    isPublished?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    productId?: SortOrderInput | SortOrder;
    ownerId?: SortOrder;
    owner?: UserOrderByWithRelationInput;
    students?: UserOrderByRelationAggregateInput;
    chapters?: ChapterOrderByRelationAggregateInput;
    progress?: ProgressOrderByRelationAggregateInput;
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: CourseWhereInput | CourseWhereInput[];
    OR?: CourseWhereInput[];
    NOT?: CourseWhereInput | CourseWhereInput[];
    title?: StringFilter<"Course"> | string;
    description?: StringFilter<"Course"> | string;
    tags?: EnumCourseTagNullableListFilter<"Course">;
    coverImage?: StringNullableFilter<"Course"> | string | null;
    price?: FloatFilter<"Course"> | number;
    isPublished?: BoolFilter<"Course"> | boolean;
    createdAt?: DateTimeFilter<"Course"> | Date | string;
    updatedAt?: DateTimeFilter<"Course"> | Date | string;
    productId?: StringNullableFilter<"Course"> | string | null;
    ownerId?: StringFilter<"Course"> | string;
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>;
    students?: UserListRelationFilter;
    chapters?: ChapterListRelationFilter;
    progress?: ProgressListRelationFilter;
  }, "id">;

  export interface CourseOrderByWithAggregationInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    tags?: SortOrder;
    coverImage?: SortOrderInput | SortOrder;
    price?: SortOrder;
    isPublished?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    productId?: SortOrderInput | SortOrder;
    ownerId?: SortOrder;
    _count?: CourseCountOrderByAggregateInput;
    _avg?: CourseAvgOrderByAggregateInput;
    _max?: CourseMaxOrderByAggregateInput;
    _min?: CourseMinOrderByAggregateInput;
    _sum?: CourseSumOrderByAggregateInput;
  }

  export interface CourseScalarWhereWithAggregatesInput {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[];
    OR?: CourseScalarWhereWithAggregatesInput[];
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Course"> | string;
    title?: StringWithAggregatesFilter<"Course"> | string;
    description?: StringWithAggregatesFilter<"Course"> | string;
    tags?: EnumCourseTagNullableListFilter<"Course">;
    coverImage?: StringNullableWithAggregatesFilter<"Course"> | string | null;
    price?: FloatWithAggregatesFilter<"Course"> | number;
    isPublished?: BoolWithAggregatesFilter<"Course"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string;
    productId?: StringNullableWithAggregatesFilter<"Course"> | string | null;
    ownerId?: StringWithAggregatesFilter<"Course"> | string;
  }

  export interface ChapterWhereInput {
    AND?: ChapterWhereInput | ChapterWhereInput[];
    OR?: ChapterWhereInput[];
    NOT?: ChapterWhereInput | ChapterWhereInput[];
    id?: StringFilter<"Chapter"> | string;
    title?: StringFilter<"Chapter"> | string;
    description?: StringFilter<"Chapter"> | string;
    courseId?: StringFilter<"Chapter"> | string;
    createdAt?: DateTimeFilter<"Chapter"> | Date | string;
    updatedAt?: DateTimeFilter<"Chapter"> | Date | string;
    isPublished?: BoolFilter<"Chapter"> | boolean;
    isFree?: BoolFilter<"Chapter"> | boolean;
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
    lessons?: LessonListRelationFilter;
  }

  export interface ChapterOrderByWithRelationInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    courseId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    course?: CourseOrderByWithRelationInput;
    lessons?: LessonOrderByRelationAggregateInput;
  }

  export type ChapterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: ChapterWhereInput | ChapterWhereInput[];
    OR?: ChapterWhereInput[];
    NOT?: ChapterWhereInput | ChapterWhereInput[];
    title?: StringFilter<"Chapter"> | string;
    description?: StringFilter<"Chapter"> | string;
    courseId?: StringFilter<"Chapter"> | string;
    createdAt?: DateTimeFilter<"Chapter"> | Date | string;
    updatedAt?: DateTimeFilter<"Chapter"> | Date | string;
    isPublished?: BoolFilter<"Chapter"> | boolean;
    isFree?: BoolFilter<"Chapter"> | boolean;
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
    lessons?: LessonListRelationFilter;
  }, "id">;

  export interface ChapterOrderByWithAggregationInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    courseId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    _count?: ChapterCountOrderByAggregateInput;
    _max?: ChapterMaxOrderByAggregateInput;
    _min?: ChapterMinOrderByAggregateInput;
  }

  export interface ChapterScalarWhereWithAggregatesInput {
    AND?: ChapterScalarWhereWithAggregatesInput | ChapterScalarWhereWithAggregatesInput[];
    OR?: ChapterScalarWhereWithAggregatesInput[];
    NOT?: ChapterScalarWhereWithAggregatesInput | ChapterScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Chapter"> | string;
    title?: StringWithAggregatesFilter<"Chapter"> | string;
    description?: StringWithAggregatesFilter<"Chapter"> | string;
    courseId?: StringWithAggregatesFilter<"Chapter"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Chapter"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Chapter"> | Date | string;
    isPublished?: BoolWithAggregatesFilter<"Chapter"> | boolean;
    isFree?: BoolWithAggregatesFilter<"Chapter"> | boolean;
  }

  export interface LessonWhereInput {
    AND?: LessonWhereInput | LessonWhereInput[];
    OR?: LessonWhereInput[];
    NOT?: LessonWhereInput | LessonWhereInput[];
    id?: StringFilter<"Lesson"> | string;
    title?: StringFilter<"Lesson"> | string;
    content?: StringFilter<"Lesson"> | string;
    chapterId?: StringFilter<"Lesson"> | string;
    position?: IntFilter<"Lesson"> | number;
    isPublished?: BoolFilter<"Lesson"> | boolean;
    isFree?: BoolFilter<"Lesson"> | boolean;
    createdAt?: DateTimeFilter<"Lesson"> | Date | string;
    updatedAt?: DateTimeFilter<"Lesson"> | Date | string;
    chapter?: XOR<ChapterScalarRelationFilter, ChapterWhereInput>;
    progress?: ProgressListRelationFilter;
  }

  export interface LessonOrderByWithRelationInput {
    id?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    chapterId?: SortOrder;
    position?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    chapter?: ChapterOrderByWithRelationInput;
    progress?: ProgressOrderByRelationAggregateInput;
  }

  export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: LessonWhereInput | LessonWhereInput[];
    OR?: LessonWhereInput[];
    NOT?: LessonWhereInput | LessonWhereInput[];
    title?: StringFilter<"Lesson"> | string;
    content?: StringFilter<"Lesson"> | string;
    chapterId?: StringFilter<"Lesson"> | string;
    position?: IntFilter<"Lesson"> | number;
    isPublished?: BoolFilter<"Lesson"> | boolean;
    isFree?: BoolFilter<"Lesson"> | boolean;
    createdAt?: DateTimeFilter<"Lesson"> | Date | string;
    updatedAt?: DateTimeFilter<"Lesson"> | Date | string;
    chapter?: XOR<ChapterScalarRelationFilter, ChapterWhereInput>;
    progress?: ProgressListRelationFilter;
  }, "id">;

  export interface LessonOrderByWithAggregationInput {
    id?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    chapterId?: SortOrder;
    position?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: LessonCountOrderByAggregateInput;
    _avg?: LessonAvgOrderByAggregateInput;
    _max?: LessonMaxOrderByAggregateInput;
    _min?: LessonMinOrderByAggregateInput;
    _sum?: LessonSumOrderByAggregateInput;
  }

  export interface LessonScalarWhereWithAggregatesInput {
    AND?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[];
    OR?: LessonScalarWhereWithAggregatesInput[];
    NOT?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Lesson"> | string;
    title?: StringWithAggregatesFilter<"Lesson"> | string;
    content?: StringWithAggregatesFilter<"Lesson"> | string;
    chapterId?: StringWithAggregatesFilter<"Lesson"> | string;
    position?: IntWithAggregatesFilter<"Lesson"> | number;
    isPublished?: BoolWithAggregatesFilter<"Lesson"> | boolean;
    isFree?: BoolWithAggregatesFilter<"Lesson"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"Lesson"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Lesson"> | Date | string;
  }

  export interface ProgressWhereInput {
    AND?: ProgressWhereInput | ProgressWhereInput[];
    OR?: ProgressWhereInput[];
    NOT?: ProgressWhereInput | ProgressWhereInput[];
    id?: StringFilter<"Progress"> | string;
    userId?: StringFilter<"Progress"> | string;
    lessonId?: StringFilter<"Progress"> | string;
    courseId?: StringFilter<"Progress"> | string;
    completed?: BoolFilter<"Progress"> | boolean;
    createdAt?: DateTimeFilter<"Progress"> | Date | string;
    updatedAt?: DateTimeFilter<"Progress"> | Date | string;
    lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>;
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
  }

  export interface ProgressOrderByWithRelationInput {
    id?: SortOrder;
    userId?: SortOrder;
    lessonId?: SortOrder;
    courseId?: SortOrder;
    completed?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    lesson?: LessonOrderByWithRelationInput;
    course?: CourseOrderByWithRelationInput;
  }

  export type ProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_lessonId?: ProgressUserIdLessonIdCompoundUniqueInput;
    AND?: ProgressWhereInput | ProgressWhereInput[];
    OR?: ProgressWhereInput[];
    NOT?: ProgressWhereInput | ProgressWhereInput[];
    userId?: StringFilter<"Progress"> | string;
    lessonId?: StringFilter<"Progress"> | string;
    courseId?: StringFilter<"Progress"> | string;
    completed?: BoolFilter<"Progress"> | boolean;
    createdAt?: DateTimeFilter<"Progress"> | Date | string;
    updatedAt?: DateTimeFilter<"Progress"> | Date | string;
    lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>;
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
  }, "id" | "userId_lessonId">;

  export interface ProgressOrderByWithAggregationInput {
    id?: SortOrder;
    userId?: SortOrder;
    lessonId?: SortOrder;
    courseId?: SortOrder;
    completed?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ProgressCountOrderByAggregateInput;
    _max?: ProgressMaxOrderByAggregateInput;
    _min?: ProgressMinOrderByAggregateInput;
  }

  export interface ProgressScalarWhereWithAggregatesInput {
    AND?: ProgressScalarWhereWithAggregatesInput | ProgressScalarWhereWithAggregatesInput[];
    OR?: ProgressScalarWhereWithAggregatesInput[];
    NOT?: ProgressScalarWhereWithAggregatesInput | ProgressScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Progress"> | string;
    userId?: StringWithAggregatesFilter<"Progress"> | string;
    lessonId?: StringWithAggregatesFilter<"Progress"> | string;
    courseId?: StringWithAggregatesFilter<"Progress"> | string;
    completed?: BoolWithAggregatesFilter<"Progress"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"Progress"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Progress"> | Date | string;
  }

  export interface SessionWhereInput {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<"Session"> | string;
    expiresAt?: DateTimeFilter<"Session"> | Date | string;
    token?: StringFilter<"Session"> | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    ipAddress?: StringNullableFilter<"Session"> | string | null;
    userAgent?: StringNullableFilter<"Session"> | string | null;
    userId?: StringFilter<"Session"> | string;
    impersonatedBy?: StringNullableFilter<"Session"> | string | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  }

  export interface SessionOrderByWithRelationInput {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    userId?: SortOrder;
    impersonatedBy?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    token?: string;
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    expiresAt?: DateTimeFilter<"Session"> | Date | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    ipAddress?: StringNullableFilter<"Session"> | string | null;
    userAgent?: StringNullableFilter<"Session"> | string | null;
    userId?: StringFilter<"Session"> | string;
    impersonatedBy?: StringNullableFilter<"Session"> | string | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  }, "id" | "token">;

  export interface SessionOrderByWithAggregationInput {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ipAddress?: SortOrderInput | SortOrder;
    userAgent?: SortOrderInput | SortOrder;
    userId?: SortOrder;
    impersonatedBy?: SortOrderInput | SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  }

  export interface SessionScalarWhereWithAggregatesInput {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Session"> | string;
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    token?: StringWithAggregatesFilter<"Session"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null;
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null;
    userId?: StringWithAggregatesFilter<"Session"> | string;
    impersonatedBy?: StringNullableWithAggregatesFilter<"Session"> | string | null;
  }

  export interface AccountWhereInput {
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    id?: StringFilter<"Account"> | string;
    accountId?: StringFilter<"Account"> | string;
    providerId?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    accessToken?: StringNullableFilter<"Account"> | string | null;
    refreshToken?: StringNullableFilter<"Account"> | string | null;
    idToken?: StringNullableFilter<"Account"> | string | null;
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null;
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    password?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  }

  export interface AccountOrderByWithRelationInput {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrderInput | SortOrder;
    refreshToken?: SortOrderInput | SortOrder;
    idToken?: SortOrderInput | SortOrder;
    accessTokenExpiresAt?: SortOrderInput | SortOrder;
    refreshTokenExpiresAt?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    accountId?: StringFilter<"Account"> | string;
    providerId?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    accessToken?: StringNullableFilter<"Account"> | string | null;
    refreshToken?: StringNullableFilter<"Account"> | string | null;
    idToken?: StringNullableFilter<"Account"> | string | null;
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null;
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    password?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  }, "id">;

  export interface AccountOrderByWithAggregationInput {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrderInput | SortOrder;
    refreshToken?: SortOrderInput | SortOrder;
    idToken?: SortOrderInput | SortOrder;
    accessTokenExpiresAt?: SortOrderInput | SortOrder;
    refreshTokenExpiresAt?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AccountCountOrderByAggregateInput;
    _max?: AccountMaxOrderByAggregateInput;
    _min?: AccountMinOrderByAggregateInput;
  }

  export interface AccountScalarWhereWithAggregatesInput {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[];
    OR?: AccountScalarWhereWithAggregatesInput[];
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Account"> | string;
    accountId?: StringWithAggregatesFilter<"Account"> | string;
    providerId?: StringWithAggregatesFilter<"Account"> | string;
    userId?: StringWithAggregatesFilter<"Account"> | string;
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null;
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null;
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string;
  }

  export interface VerificationWhereInput {
    AND?: VerificationWhereInput | VerificationWhereInput[];
    OR?: VerificationWhereInput[];
    NOT?: VerificationWhereInput | VerificationWhereInput[];
    id?: StringFilter<"Verification"> | string;
    identifier?: StringFilter<"Verification"> | string;
    value?: StringFilter<"Verification"> | string;
    expiresAt?: DateTimeFilter<"Verification"> | Date | string;
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null;
  }

  export interface VerificationOrderByWithRelationInput {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: VerificationWhereInput | VerificationWhereInput[];
    OR?: VerificationWhereInput[];
    NOT?: VerificationWhereInput | VerificationWhereInput[];
    identifier?: StringFilter<"Verification"> | string;
    value?: StringFilter<"Verification"> | string;
    expiresAt?: DateTimeFilter<"Verification"> | Date | string;
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null;
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null;
  }, "id">;

  export interface VerificationOrderByWithAggregationInput {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrderInput | SortOrder;
    updatedAt?: SortOrderInput | SortOrder;
    _count?: VerificationCountOrderByAggregateInput;
    _max?: VerificationMaxOrderByAggregateInput;
    _min?: VerificationMinOrderByAggregateInput;
  }

  export interface VerificationScalarWhereWithAggregatesInput {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[];
    OR?: VerificationScalarWhereWithAggregatesInput[];
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Verification"> | string;
    identifier?: StringWithAggregatesFilter<"Verification"> | string;
    value?: StringWithAggregatesFilter<"Verification"> | string;
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string;
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null;
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null;
  }

  export interface UserCreateInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseCreateNestedManyWithoutOwnerInput;
    enrolledCourses?: CourseCreateNestedManyWithoutStudentsInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
  }

  export interface UserUncheckedCreateInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseUncheckedCreateNestedManyWithoutOwnerInput;
    enrolledCourses?: CourseUncheckedCreateNestedManyWithoutStudentsInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
  }

  export interface UserUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUpdateManyWithoutOwnerNestedInput;
    enrolledCourses?: CourseUpdateManyWithoutStudentsNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
  }

  export interface UserUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUncheckedUpdateManyWithoutOwnerNestedInput;
    enrolledCourses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
  }

  export interface UserCreateManyInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
  }

  export interface UserUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface UserUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface CourseCreateInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    owner: UserCreateNestedOneWithoutOwnedCoursesInput;
    students?: UserCreateNestedManyWithoutEnrolledCoursesInput;
    chapters?: ChapterCreateNestedManyWithoutCourseInput;
    progress?: ProgressCreateNestedManyWithoutCourseInput;
  }

  export interface CourseUncheckedCreateInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    ownerId: string;
    students?: UserUncheckedCreateNestedManyWithoutEnrolledCoursesInput;
    chapters?: ChapterUncheckedCreateNestedManyWithoutCourseInput;
    progress?: ProgressUncheckedCreateNestedManyWithoutCourseInput;
  }

  export interface CourseUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    owner?: UserUpdateOneRequiredWithoutOwnedCoursesNestedInput;
    students?: UserUpdateManyWithoutEnrolledCoursesNestedInput;
    chapters?: ChapterUpdateManyWithoutCourseNestedInput;
    progress?: ProgressUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: StringFieldUpdateOperationsInput | string;
    students?: UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInput;
    chapters?: ChapterUncheckedUpdateManyWithoutCourseNestedInput;
    progress?: ProgressUncheckedUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseCreateManyInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    ownerId: string;
  }

  export interface CourseUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface CourseUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: StringFieldUpdateOperationsInput | string;
  }

  export interface ChapterCreateInput {
    id?: string;
    title: string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
    course: CourseCreateNestedOneWithoutChaptersInput;
    lessons?: LessonCreateNestedManyWithoutChapterInput;
  }

  export interface ChapterUncheckedCreateInput {
    id?: string;
    title: string;
    description: string;
    courseId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
    lessons?: LessonUncheckedCreateNestedManyWithoutChapterInput;
  }

  export interface ChapterUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    course?: CourseUpdateOneRequiredWithoutChaptersNestedInput;
    lessons?: LessonUpdateManyWithoutChapterNestedInput;
  }

  export interface ChapterUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    lessons?: LessonUncheckedUpdateManyWithoutChapterNestedInput;
  }

  export interface ChapterCreateManyInput {
    id?: string;
    title: string;
    description: string;
    courseId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
  }

  export interface ChapterUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
  }

  export interface ChapterUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
  }

  export interface LessonCreateInput {
    id?: string;
    title: string;
    content: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapter: ChapterCreateNestedOneWithoutLessonsInput;
    progress?: ProgressCreateNestedManyWithoutLessonInput;
  }

  export interface LessonUncheckedCreateInput {
    id?: string;
    title: string;
    content: string;
    chapterId: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    progress?: ProgressUncheckedCreateNestedManyWithoutLessonInput;
  }

  export interface LessonUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chapter?: ChapterUpdateOneRequiredWithoutLessonsNestedInput;
    progress?: ProgressUpdateManyWithoutLessonNestedInput;
  }

  export interface LessonUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    chapterId?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    progress?: ProgressUncheckedUpdateManyWithoutLessonNestedInput;
  }

  export interface LessonCreateManyInput {
    id?: string;
    title: string;
    content: string;
    chapterId: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface LessonUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface LessonUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    chapterId?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ProgressCreateInput {
    id?: string;
    userId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lesson: LessonCreateNestedOneWithoutProgressInput;
    course: CourseCreateNestedOneWithoutProgressInput;
  }

  export interface ProgressUncheckedCreateInput {
    id?: string;
    userId: string;
    lessonId: string;
    courseId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface ProgressUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lesson?: LessonUpdateOneRequiredWithoutProgressNestedInput;
    course?: CourseUpdateOneRequiredWithoutProgressNestedInput;
  }

  export interface ProgressUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    lessonId?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ProgressCreateManyInput {
    id?: string;
    userId: string;
    lessonId: string;
    courseId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface ProgressUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ProgressUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    lessonId?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface SessionCreateInput {
    id: string;
    expiresAt: Date | string;
    token: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    impersonatedBy?: string | null;
    user: UserCreateNestedOneWithoutSessionsInput;
  }

  export interface SessionUncheckedCreateInput {
    id: string;
    expiresAt: Date | string;
    token: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
    impersonatedBy?: string | null;
  }

  export interface SessionUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  }

  export interface SessionUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    userId?: StringFieldUpdateOperationsInput | string;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface SessionCreateManyInput {
    id: string;
    expiresAt: Date | string;
    token: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
    impersonatedBy?: string | null;
  }

  export interface SessionUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface SessionUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    userId?: StringFieldUpdateOperationsInput | string;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface AccountCreateInput {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: UserCreateNestedOneWithoutAccountsInput;
  }

  export interface AccountUncheckedCreateInput {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export interface AccountUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
  }

  export interface AccountUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface AccountCreateManyInput {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export interface AccountUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface AccountUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface VerificationCreateInput {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date | string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  }

  export interface VerificationUncheckedCreateInput {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date | string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  }

  export interface VerificationUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface VerificationUncheckedUpdateInput {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface VerificationCreateManyInput {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date | string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  }

  export interface VerificationUpdateManyMutationInput {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface VerificationUncheckedUpdateManyInput {
    id?: StringFieldUpdateOperationsInput | string;
    identifier?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface StringFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  }

  export interface StringNullableFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  }

  export interface DateTimeFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  }

  export interface BoolFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  }

  export interface EnumRoleNullableListFilter<$PrismaModel = never> {
    equals?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    has?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  }

  export interface BoolNullableFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null;
  }

  export interface DateTimeNullableFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  }

  export interface CourseListRelationFilter {
    every?: CourseWhereInput;
    some?: CourseWhereInput;
    none?: CourseWhereInput;
  }

  export interface SessionListRelationFilter {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  }

  export interface AccountListRelationFilter {
    every?: AccountWhereInput;
    some?: AccountWhereInput;
    none?: AccountWhereInput;
  }

  export interface SortOrderInput {
    sort: SortOrder;
    nulls?: NullsOrder;
  }

  export interface CourseOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface SessionOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface AccountOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface UserCountOrderByAggregateInput {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    roles?: SortOrder;
    role?: SortOrder;
    banned?: SortOrder;
    banReason?: SortOrder;
    banExpires?: SortOrder;
  }

  export interface UserMaxOrderByAggregateInput {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    role?: SortOrder;
    banned?: SortOrder;
    banReason?: SortOrder;
    banExpires?: SortOrder;
  }

  export interface UserMinOrderByAggregateInput {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    emailVerified?: SortOrder;
    image?: SortOrder;
    role?: SortOrder;
    banned?: SortOrder;
    banReason?: SortOrder;
    banExpires?: SortOrder;
  }

  export interface StringWithAggregatesFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  }

  export interface StringNullableWithAggregatesFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  }

  export interface DateTimeWithAggregatesFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  }

  export interface BoolWithAggregatesFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  }

  export interface BoolNullableWithAggregatesFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedBoolNullableFilter<$PrismaModel>;
    _max?: NestedBoolNullableFilter<$PrismaModel>;
  }

  export interface DateTimeNullableWithAggregatesFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  }

  export interface EnumCourseTagNullableListFilter<$PrismaModel = never> {
    equals?: $Enums.CourseTag[] | ListEnumCourseTagFieldRefInput<$PrismaModel> | null;
    has?: $Enums.CourseTag | EnumCourseTagFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.CourseTag[] | ListEnumCourseTagFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.CourseTag[] | ListEnumCourseTagFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  }

  export interface FloatFilter<$PrismaModel = never> {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  }

  export interface UserScalarRelationFilter {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  }

  export interface UserListRelationFilter {
    every?: UserWhereInput;
    some?: UserWhereInput;
    none?: UserWhereInput;
  }

  export interface ChapterListRelationFilter {
    every?: ChapterWhereInput;
    some?: ChapterWhereInput;
    none?: ChapterWhereInput;
  }

  export interface ProgressListRelationFilter {
    every?: ProgressWhereInput;
    some?: ProgressWhereInput;
    none?: ProgressWhereInput;
  }

  export interface UserOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface ChapterOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface ProgressOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface CourseCountOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    tags?: SortOrder;
    coverImage?: SortOrder;
    price?: SortOrder;
    isPublished?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    productId?: SortOrder;
    ownerId?: SortOrder;
  }

  export interface CourseAvgOrderByAggregateInput {
    price?: SortOrder;
  }

  export interface CourseMaxOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    coverImage?: SortOrder;
    price?: SortOrder;
    isPublished?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    productId?: SortOrder;
    ownerId?: SortOrder;
  }

  export interface CourseMinOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    coverImage?: SortOrder;
    price?: SortOrder;
    isPublished?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    productId?: SortOrder;
    ownerId?: SortOrder;
  }

  export interface CourseSumOrderByAggregateInput {
    price?: SortOrder;
  }

  export interface FloatWithAggregatesFilter<$PrismaModel = never> {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  }

  export interface CourseScalarRelationFilter {
    is?: CourseWhereInput;
    isNot?: CourseWhereInput;
  }

  export interface LessonListRelationFilter {
    every?: LessonWhereInput;
    some?: LessonWhereInput;
    none?: LessonWhereInput;
  }

  export interface LessonOrderByRelationAggregateInput {
    _count?: SortOrder;
  }

  export interface ChapterCountOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    courseId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
  }

  export interface ChapterMaxOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    courseId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
  }

  export interface ChapterMinOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    courseId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
  }

  export interface IntFilter<$PrismaModel = never> {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  }

  export interface ChapterScalarRelationFilter {
    is?: ChapterWhereInput;
    isNot?: ChapterWhereInput;
  }

  export interface LessonCountOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    chapterId?: SortOrder;
    position?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface LessonAvgOrderByAggregateInput {
    position?: SortOrder;
  }

  export interface LessonMaxOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    chapterId?: SortOrder;
    position?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface LessonMinOrderByAggregateInput {
    id?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    chapterId?: SortOrder;
    position?: SortOrder;
    isPublished?: SortOrder;
    isFree?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface LessonSumOrderByAggregateInput {
    position?: SortOrder;
  }

  export interface IntWithAggregatesFilter<$PrismaModel = never> {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  }

  export interface LessonScalarRelationFilter {
    is?: LessonWhereInput;
    isNot?: LessonWhereInput;
  }

  export interface ProgressUserIdLessonIdCompoundUniqueInput {
    userId: string;
    lessonId: string;
  }

  export interface ProgressCountOrderByAggregateInput {
    id?: SortOrder;
    userId?: SortOrder;
    lessonId?: SortOrder;
    courseId?: SortOrder;
    completed?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface ProgressMaxOrderByAggregateInput {
    id?: SortOrder;
    userId?: SortOrder;
    lessonId?: SortOrder;
    courseId?: SortOrder;
    completed?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface ProgressMinOrderByAggregateInput {
    id?: SortOrder;
    userId?: SortOrder;
    lessonId?: SortOrder;
    courseId?: SortOrder;
    completed?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface SessionCountOrderByAggregateInput {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    userId?: SortOrder;
    impersonatedBy?: SortOrder;
  }

  export interface SessionMaxOrderByAggregateInput {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    userId?: SortOrder;
    impersonatedBy?: SortOrder;
  }

  export interface SessionMinOrderByAggregateInput {
    id?: SortOrder;
    expiresAt?: SortOrder;
    token?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ipAddress?: SortOrder;
    userAgent?: SortOrder;
    userId?: SortOrder;
    impersonatedBy?: SortOrder;
  }

  export interface AccountCountOrderByAggregateInput {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrder;
    refreshToken?: SortOrder;
    idToken?: SortOrder;
    accessTokenExpiresAt?: SortOrder;
    refreshTokenExpiresAt?: SortOrder;
    scope?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface AccountMaxOrderByAggregateInput {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrder;
    refreshToken?: SortOrder;
    idToken?: SortOrder;
    accessTokenExpiresAt?: SortOrder;
    refreshTokenExpiresAt?: SortOrder;
    scope?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface AccountMinOrderByAggregateInput {
    id?: SortOrder;
    accountId?: SortOrder;
    providerId?: SortOrder;
    userId?: SortOrder;
    accessToken?: SortOrder;
    refreshToken?: SortOrder;
    idToken?: SortOrder;
    accessTokenExpiresAt?: SortOrder;
    refreshTokenExpiresAt?: SortOrder;
    scope?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface VerificationCountOrderByAggregateInput {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface VerificationMaxOrderByAggregateInput {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface VerificationMinOrderByAggregateInput {
    id?: SortOrder;
    identifier?: SortOrder;
    value?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  }

  export interface UserCreaterolesInput {
    set: $Enums.Role[];
  }

  export interface CourseCreateNestedManyWithoutOwnerInput {
    create?: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput> | CourseCreateWithoutOwnerInput[] | CourseUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutOwnerInput | CourseCreateOrConnectWithoutOwnerInput[];
    createMany?: CourseCreateManyOwnerInputEnvelope;
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
  }

  export interface CourseCreateNestedManyWithoutStudentsInput {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[];
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
  }

  export interface SessionCreateNestedManyWithoutUserInput {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  }

  export interface AccountCreateNestedManyWithoutUserInput {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  }

  export interface CourseUncheckedCreateNestedManyWithoutOwnerInput {
    create?: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput> | CourseCreateWithoutOwnerInput[] | CourseUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutOwnerInput | CourseCreateOrConnectWithoutOwnerInput[];
    createMany?: CourseCreateManyOwnerInputEnvelope;
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
  }

  export interface CourseUncheckedCreateNestedManyWithoutStudentsInput {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[];
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
  }

  export interface SessionUncheckedCreateNestedManyWithoutUserInput {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  }

  export interface AccountUncheckedCreateNestedManyWithoutUserInput {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  }

  export interface StringFieldUpdateOperationsInput {
    set?: string;
  }

  export interface NullableStringFieldUpdateOperationsInput {
    set?: string | null;
  }

  export interface DateTimeFieldUpdateOperationsInput {
    set?: Date | string;
  }

  export interface BoolFieldUpdateOperationsInput {
    set?: boolean;
  }

  export interface UserUpdaterolesInput {
    set?: $Enums.Role[];
    push?: $Enums.Role | $Enums.Role[];
  }

  export interface NullableBoolFieldUpdateOperationsInput {
    set?: boolean | null;
  }

  export interface NullableDateTimeFieldUpdateOperationsInput {
    set?: Date | string | null;
  }

  export interface CourseUpdateManyWithoutOwnerNestedInput {
    create?: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput> | CourseCreateWithoutOwnerInput[] | CourseUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutOwnerInput | CourseCreateOrConnectWithoutOwnerInput[];
    upsert?: CourseUpsertWithWhereUniqueWithoutOwnerInput | CourseUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: CourseCreateManyOwnerInputEnvelope;
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    update?: CourseUpdateWithWhereUniqueWithoutOwnerInput | CourseUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: CourseUpdateManyWithWhereWithoutOwnerInput | CourseUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[];
  }

  export interface CourseUpdateManyWithoutStudentsNestedInput {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[];
    upsert?: CourseUpsertWithWhereUniqueWithoutStudentsInput | CourseUpsertWithWhereUniqueWithoutStudentsInput[];
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    update?: CourseUpdateWithWhereUniqueWithoutStudentsInput | CourseUpdateWithWhereUniqueWithoutStudentsInput[];
    updateMany?: CourseUpdateManyWithWhereWithoutStudentsInput | CourseUpdateManyWithWhereWithoutStudentsInput[];
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[];
  }

  export interface SessionUpdateManyWithoutUserNestedInput {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  }

  export interface AccountUpdateManyWithoutUserNestedInput {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[];
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  }

  export interface CourseUncheckedUpdateManyWithoutOwnerNestedInput {
    create?: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput> | CourseCreateWithoutOwnerInput[] | CourseUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutOwnerInput | CourseCreateOrConnectWithoutOwnerInput[];
    upsert?: CourseUpsertWithWhereUniqueWithoutOwnerInput | CourseUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: CourseCreateManyOwnerInputEnvelope;
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    update?: CourseUpdateWithWhereUniqueWithoutOwnerInput | CourseUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: CourseUpdateManyWithWhereWithoutOwnerInput | CourseUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[];
  }

  export interface CourseUncheckedUpdateManyWithoutStudentsNestedInput {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[];
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[];
    upsert?: CourseUpsertWithWhereUniqueWithoutStudentsInput | CourseUpsertWithWhereUniqueWithoutStudentsInput[];
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    update?: CourseUpdateWithWhereUniqueWithoutStudentsInput | CourseUpdateWithWhereUniqueWithoutStudentsInput[];
    updateMany?: CourseUpdateManyWithWhereWithoutStudentsInput | CourseUpdateManyWithWhereWithoutStudentsInput[];
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[];
  }

  export interface SessionUncheckedUpdateManyWithoutUserNestedInput {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  }

  export interface AccountUncheckedUpdateManyWithoutUserNestedInput {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[];
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  }

  export interface CourseCreatetagsInput {
    set: $Enums.CourseTag[];
  }

  export interface UserCreateNestedOneWithoutOwnedCoursesInput {
    create?: XOR<UserCreateWithoutOwnedCoursesInput, UserUncheckedCreateWithoutOwnedCoursesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCoursesInput;
    connect?: UserWhereUniqueInput;
  }

  export interface UserCreateNestedManyWithoutEnrolledCoursesInput {
    create?: XOR<UserCreateWithoutEnrolledCoursesInput, UserUncheckedCreateWithoutEnrolledCoursesInput> | UserCreateWithoutEnrolledCoursesInput[] | UserUncheckedCreateWithoutEnrolledCoursesInput[];
    connectOrCreate?: UserCreateOrConnectWithoutEnrolledCoursesInput | UserCreateOrConnectWithoutEnrolledCoursesInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
  }

  export interface ChapterCreateNestedManyWithoutCourseInput {
    create?: XOR<ChapterCreateWithoutCourseInput, ChapterUncheckedCreateWithoutCourseInput> | ChapterCreateWithoutCourseInput[] | ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ChapterCreateOrConnectWithoutCourseInput | ChapterCreateOrConnectWithoutCourseInput[];
    createMany?: ChapterCreateManyCourseInputEnvelope;
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
  }

  export interface ProgressCreateNestedManyWithoutCourseInput {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[];
    createMany?: ProgressCreateManyCourseInputEnvelope;
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
  }

  export interface UserUncheckedCreateNestedManyWithoutEnrolledCoursesInput {
    create?: XOR<UserCreateWithoutEnrolledCoursesInput, UserUncheckedCreateWithoutEnrolledCoursesInput> | UserCreateWithoutEnrolledCoursesInput[] | UserUncheckedCreateWithoutEnrolledCoursesInput[];
    connectOrCreate?: UserCreateOrConnectWithoutEnrolledCoursesInput | UserCreateOrConnectWithoutEnrolledCoursesInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
  }

  export interface ChapterUncheckedCreateNestedManyWithoutCourseInput {
    create?: XOR<ChapterCreateWithoutCourseInput, ChapterUncheckedCreateWithoutCourseInput> | ChapterCreateWithoutCourseInput[] | ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ChapterCreateOrConnectWithoutCourseInput | ChapterCreateOrConnectWithoutCourseInput[];
    createMany?: ChapterCreateManyCourseInputEnvelope;
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
  }

  export interface ProgressUncheckedCreateNestedManyWithoutCourseInput {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[];
    createMany?: ProgressCreateManyCourseInputEnvelope;
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
  }

  export interface CourseUpdatetagsInput {
    set?: $Enums.CourseTag[];
    push?: $Enums.CourseTag | $Enums.CourseTag[];
  }

  export interface FloatFieldUpdateOperationsInput {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  }

  export interface UserUpdateOneRequiredWithoutOwnedCoursesNestedInput {
    create?: XOR<UserCreateWithoutOwnedCoursesInput, UserUncheckedCreateWithoutOwnedCoursesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCoursesInput;
    upsert?: UserUpsertWithoutOwnedCoursesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedCoursesInput, UserUpdateWithoutOwnedCoursesInput>, UserUncheckedUpdateWithoutOwnedCoursesInput>;
  }

  export interface UserUpdateManyWithoutEnrolledCoursesNestedInput {
    create?: XOR<UserCreateWithoutEnrolledCoursesInput, UserUncheckedCreateWithoutEnrolledCoursesInput> | UserCreateWithoutEnrolledCoursesInput[] | UserUncheckedCreateWithoutEnrolledCoursesInput[];
    connectOrCreate?: UserCreateOrConnectWithoutEnrolledCoursesInput | UserCreateOrConnectWithoutEnrolledCoursesInput[];
    upsert?: UserUpsertWithWhereUniqueWithoutEnrolledCoursesInput | UserUpsertWithWhereUniqueWithoutEnrolledCoursesInput[];
    set?: UserWhereUniqueInput | UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    update?: UserUpdateWithWhereUniqueWithoutEnrolledCoursesInput | UserUpdateWithWhereUniqueWithoutEnrolledCoursesInput[];
    updateMany?: UserUpdateManyWithWhereWithoutEnrolledCoursesInput | UserUpdateManyWithWhereWithoutEnrolledCoursesInput[];
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[];
  }

  export interface ChapterUpdateManyWithoutCourseNestedInput {
    create?: XOR<ChapterCreateWithoutCourseInput, ChapterUncheckedCreateWithoutCourseInput> | ChapterCreateWithoutCourseInput[] | ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ChapterCreateOrConnectWithoutCourseInput | ChapterCreateOrConnectWithoutCourseInput[];
    upsert?: ChapterUpsertWithWhereUniqueWithoutCourseInput | ChapterUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: ChapterCreateManyCourseInputEnvelope;
    set?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    disconnect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    delete?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    update?: ChapterUpdateWithWhereUniqueWithoutCourseInput | ChapterUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: ChapterUpdateManyWithWhereWithoutCourseInput | ChapterUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: ChapterScalarWhereInput | ChapterScalarWhereInput[];
  }

  export interface ProgressUpdateManyWithoutCourseNestedInput {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[];
    upsert?: ProgressUpsertWithWhereUniqueWithoutCourseInput | ProgressUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: ProgressCreateManyCourseInputEnvelope;
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    update?: ProgressUpdateWithWhereUniqueWithoutCourseInput | ProgressUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: ProgressUpdateManyWithWhereWithoutCourseInput | ProgressUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[];
  }

  export interface UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInput {
    create?: XOR<UserCreateWithoutEnrolledCoursesInput, UserUncheckedCreateWithoutEnrolledCoursesInput> | UserCreateWithoutEnrolledCoursesInput[] | UserUncheckedCreateWithoutEnrolledCoursesInput[];
    connectOrCreate?: UserCreateOrConnectWithoutEnrolledCoursesInput | UserCreateOrConnectWithoutEnrolledCoursesInput[];
    upsert?: UserUpsertWithWhereUniqueWithoutEnrolledCoursesInput | UserUpsertWithWhereUniqueWithoutEnrolledCoursesInput[];
    set?: UserWhereUniqueInput | UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    update?: UserUpdateWithWhereUniqueWithoutEnrolledCoursesInput | UserUpdateWithWhereUniqueWithoutEnrolledCoursesInput[];
    updateMany?: UserUpdateManyWithWhereWithoutEnrolledCoursesInput | UserUpdateManyWithWhereWithoutEnrolledCoursesInput[];
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[];
  }

  export interface ChapterUncheckedUpdateManyWithoutCourseNestedInput {
    create?: XOR<ChapterCreateWithoutCourseInput, ChapterUncheckedCreateWithoutCourseInput> | ChapterCreateWithoutCourseInput[] | ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ChapterCreateOrConnectWithoutCourseInput | ChapterCreateOrConnectWithoutCourseInput[];
    upsert?: ChapterUpsertWithWhereUniqueWithoutCourseInput | ChapterUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: ChapterCreateManyCourseInputEnvelope;
    set?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    disconnect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    delete?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    connect?: ChapterWhereUniqueInput | ChapterWhereUniqueInput[];
    update?: ChapterUpdateWithWhereUniqueWithoutCourseInput | ChapterUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: ChapterUpdateManyWithWhereWithoutCourseInput | ChapterUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: ChapterScalarWhereInput | ChapterScalarWhereInput[];
  }

  export interface ProgressUncheckedUpdateManyWithoutCourseNestedInput {
    create?: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput> | ProgressCreateWithoutCourseInput[] | ProgressUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutCourseInput | ProgressCreateOrConnectWithoutCourseInput[];
    upsert?: ProgressUpsertWithWhereUniqueWithoutCourseInput | ProgressUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: ProgressCreateManyCourseInputEnvelope;
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    update?: ProgressUpdateWithWhereUniqueWithoutCourseInput | ProgressUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: ProgressUpdateManyWithWhereWithoutCourseInput | ProgressUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[];
  }

  export interface CourseCreateNestedOneWithoutChaptersInput {
    create?: XOR<CourseCreateWithoutChaptersInput, CourseUncheckedCreateWithoutChaptersInput>;
    connectOrCreate?: CourseCreateOrConnectWithoutChaptersInput;
    connect?: CourseWhereUniqueInput;
  }

  export interface LessonCreateNestedManyWithoutChapterInput {
    create?: XOR<LessonCreateWithoutChapterInput, LessonUncheckedCreateWithoutChapterInput> | LessonCreateWithoutChapterInput[] | LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: LessonCreateOrConnectWithoutChapterInput | LessonCreateOrConnectWithoutChapterInput[];
    createMany?: LessonCreateManyChapterInputEnvelope;
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
  }

  export interface LessonUncheckedCreateNestedManyWithoutChapterInput {
    create?: XOR<LessonCreateWithoutChapterInput, LessonUncheckedCreateWithoutChapterInput> | LessonCreateWithoutChapterInput[] | LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: LessonCreateOrConnectWithoutChapterInput | LessonCreateOrConnectWithoutChapterInput[];
    createMany?: LessonCreateManyChapterInputEnvelope;
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
  }

  export interface CourseUpdateOneRequiredWithoutChaptersNestedInput {
    create?: XOR<CourseCreateWithoutChaptersInput, CourseUncheckedCreateWithoutChaptersInput>;
    connectOrCreate?: CourseCreateOrConnectWithoutChaptersInput;
    upsert?: CourseUpsertWithoutChaptersInput;
    connect?: CourseWhereUniqueInput;
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutChaptersInput, CourseUpdateWithoutChaptersInput>, CourseUncheckedUpdateWithoutChaptersInput>;
  }

  export interface LessonUpdateManyWithoutChapterNestedInput {
    create?: XOR<LessonCreateWithoutChapterInput, LessonUncheckedCreateWithoutChapterInput> | LessonCreateWithoutChapterInput[] | LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: LessonCreateOrConnectWithoutChapterInput | LessonCreateOrConnectWithoutChapterInput[];
    upsert?: LessonUpsertWithWhereUniqueWithoutChapterInput | LessonUpsertWithWhereUniqueWithoutChapterInput[];
    createMany?: LessonCreateManyChapterInputEnvelope;
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    update?: LessonUpdateWithWhereUniqueWithoutChapterInput | LessonUpdateWithWhereUniqueWithoutChapterInput[];
    updateMany?: LessonUpdateManyWithWhereWithoutChapterInput | LessonUpdateManyWithWhereWithoutChapterInput[];
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[];
  }

  export interface LessonUncheckedUpdateManyWithoutChapterNestedInput {
    create?: XOR<LessonCreateWithoutChapterInput, LessonUncheckedCreateWithoutChapterInput> | LessonCreateWithoutChapterInput[] | LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: LessonCreateOrConnectWithoutChapterInput | LessonCreateOrConnectWithoutChapterInput[];
    upsert?: LessonUpsertWithWhereUniqueWithoutChapterInput | LessonUpsertWithWhereUniqueWithoutChapterInput[];
    createMany?: LessonCreateManyChapterInputEnvelope;
    set?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    update?: LessonUpdateWithWhereUniqueWithoutChapterInput | LessonUpdateWithWhereUniqueWithoutChapterInput[];
    updateMany?: LessonUpdateManyWithWhereWithoutChapterInput | LessonUpdateManyWithWhereWithoutChapterInput[];
    deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[];
  }

  export interface ChapterCreateNestedOneWithoutLessonsInput {
    create?: XOR<ChapterCreateWithoutLessonsInput, ChapterUncheckedCreateWithoutLessonsInput>;
    connectOrCreate?: ChapterCreateOrConnectWithoutLessonsInput;
    connect?: ChapterWhereUniqueInput;
  }

  export interface ProgressCreateNestedManyWithoutLessonInput {
    create?: XOR<ProgressCreateWithoutLessonInput, ProgressUncheckedCreateWithoutLessonInput> | ProgressCreateWithoutLessonInput[] | ProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutLessonInput | ProgressCreateOrConnectWithoutLessonInput[];
    createMany?: ProgressCreateManyLessonInputEnvelope;
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
  }

  export interface ProgressUncheckedCreateNestedManyWithoutLessonInput {
    create?: XOR<ProgressCreateWithoutLessonInput, ProgressUncheckedCreateWithoutLessonInput> | ProgressCreateWithoutLessonInput[] | ProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutLessonInput | ProgressCreateOrConnectWithoutLessonInput[];
    createMany?: ProgressCreateManyLessonInputEnvelope;
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
  }

  export interface IntFieldUpdateOperationsInput {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  }

  export interface ChapterUpdateOneRequiredWithoutLessonsNestedInput {
    create?: XOR<ChapterCreateWithoutLessonsInput, ChapterUncheckedCreateWithoutLessonsInput>;
    connectOrCreate?: ChapterCreateOrConnectWithoutLessonsInput;
    upsert?: ChapterUpsertWithoutLessonsInput;
    connect?: ChapterWhereUniqueInput;
    update?: XOR<XOR<ChapterUpdateToOneWithWhereWithoutLessonsInput, ChapterUpdateWithoutLessonsInput>, ChapterUncheckedUpdateWithoutLessonsInput>;
  }

  export interface ProgressUpdateManyWithoutLessonNestedInput {
    create?: XOR<ProgressCreateWithoutLessonInput, ProgressUncheckedCreateWithoutLessonInput> | ProgressCreateWithoutLessonInput[] | ProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutLessonInput | ProgressCreateOrConnectWithoutLessonInput[];
    upsert?: ProgressUpsertWithWhereUniqueWithoutLessonInput | ProgressUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: ProgressCreateManyLessonInputEnvelope;
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    update?: ProgressUpdateWithWhereUniqueWithoutLessonInput | ProgressUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: ProgressUpdateManyWithWhereWithoutLessonInput | ProgressUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[];
  }

  export interface ProgressUncheckedUpdateManyWithoutLessonNestedInput {
    create?: XOR<ProgressCreateWithoutLessonInput, ProgressUncheckedCreateWithoutLessonInput> | ProgressCreateWithoutLessonInput[] | ProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: ProgressCreateOrConnectWithoutLessonInput | ProgressCreateOrConnectWithoutLessonInput[];
    upsert?: ProgressUpsertWithWhereUniqueWithoutLessonInput | ProgressUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: ProgressCreateManyLessonInputEnvelope;
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[];
    update?: ProgressUpdateWithWhereUniqueWithoutLessonInput | ProgressUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: ProgressUpdateManyWithWhereWithoutLessonInput | ProgressUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[];
  }

  export interface LessonCreateNestedOneWithoutProgressInput {
    create?: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: LessonCreateOrConnectWithoutProgressInput;
    connect?: LessonWhereUniqueInput;
  }

  export interface CourseCreateNestedOneWithoutProgressInput {
    create?: XOR<CourseCreateWithoutProgressInput, CourseUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: CourseCreateOrConnectWithoutProgressInput;
    connect?: CourseWhereUniqueInput;
  }

  export interface LessonUpdateOneRequiredWithoutProgressNestedInput {
    create?: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: LessonCreateOrConnectWithoutProgressInput;
    upsert?: LessonUpsertWithoutProgressInput;
    connect?: LessonWhereUniqueInput;
    update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutProgressInput, LessonUpdateWithoutProgressInput>, LessonUncheckedUpdateWithoutProgressInput>;
  }

  export interface CourseUpdateOneRequiredWithoutProgressNestedInput {
    create?: XOR<CourseCreateWithoutProgressInput, CourseUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: CourseCreateOrConnectWithoutProgressInput;
    upsert?: CourseUpsertWithoutProgressInput;
    connect?: CourseWhereUniqueInput;
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutProgressInput, CourseUpdateWithoutProgressInput>, CourseUncheckedUpdateWithoutProgressInput>;
  }

  export interface UserCreateNestedOneWithoutSessionsInput {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  }

  export interface UserUpdateOneRequiredWithoutSessionsNestedInput {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>;
  }

  export interface UserCreateNestedOneWithoutAccountsInput {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
  }

  export interface UserUpdateOneRequiredWithoutAccountsNestedInput {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    upsert?: UserUpsertWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>;
  }

  export interface NestedStringFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  }

  export interface NestedStringNullableFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  }

  export interface NestedDateTimeFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  }

  export interface NestedBoolFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  }

  export interface NestedBoolNullableFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null;
  }

  export interface NestedDateTimeNullableFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  }

  export interface NestedStringWithAggregatesFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  }

  export interface NestedIntFilter<$PrismaModel = never> {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  }

  export interface NestedStringNullableWithAggregatesFilter<$PrismaModel = never> {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  }

  export interface NestedIntNullableFilter<$PrismaModel = never> {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  }

  export interface NestedDateTimeWithAggregatesFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  }

  export interface NestedBoolWithAggregatesFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  }

  export interface NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null;
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedBoolNullableFilter<$PrismaModel>;
    _max?: NestedBoolNullableFilter<$PrismaModel>;
  }

  export interface NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  }

  export interface NestedFloatFilter<$PrismaModel = never> {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  }

  export interface NestedFloatWithAggregatesFilter<$PrismaModel = never> {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  }

  export interface NestedIntWithAggregatesFilter<$PrismaModel = never> {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  }

  export interface CourseCreateWithoutOwnerInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    students?: UserCreateNestedManyWithoutEnrolledCoursesInput;
    chapters?: ChapterCreateNestedManyWithoutCourseInput;
    progress?: ProgressCreateNestedManyWithoutCourseInput;
  }

  export interface CourseUncheckedCreateWithoutOwnerInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    students?: UserUncheckedCreateNestedManyWithoutEnrolledCoursesInput;
    chapters?: ChapterUncheckedCreateNestedManyWithoutCourseInput;
    progress?: ProgressUncheckedCreateNestedManyWithoutCourseInput;
  }

  export interface CourseCreateOrConnectWithoutOwnerInput {
    where: CourseWhereUniqueInput;
    create: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput>;
  }

  export interface CourseCreateManyOwnerInputEnvelope {
    data: CourseCreateManyOwnerInput | CourseCreateManyOwnerInput[];
    skipDuplicates?: boolean;
  }

  export interface CourseCreateWithoutStudentsInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    owner: UserCreateNestedOneWithoutOwnedCoursesInput;
    chapters?: ChapterCreateNestedManyWithoutCourseInput;
    progress?: ProgressCreateNestedManyWithoutCourseInput;
  }

  export interface CourseUncheckedCreateWithoutStudentsInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    ownerId: string;
    chapters?: ChapterUncheckedCreateNestedManyWithoutCourseInput;
    progress?: ProgressUncheckedCreateNestedManyWithoutCourseInput;
  }

  export interface CourseCreateOrConnectWithoutStudentsInput {
    where: CourseWhereUniqueInput;
    create: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>;
  }

  export interface SessionCreateWithoutUserInput {
    id: string;
    expiresAt: Date | string;
    token: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    impersonatedBy?: string | null;
  }

  export interface SessionUncheckedCreateWithoutUserInput {
    id: string;
    expiresAt: Date | string;
    token: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    impersonatedBy?: string | null;
  }

  export interface SessionCreateOrConnectWithoutUserInput {
    where: SessionWhereUniqueInput;
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>;
  }

  export interface SessionCreateManyUserInputEnvelope {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  }

  export interface AccountCreateWithoutUserInput {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export interface AccountUncheckedCreateWithoutUserInput {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export interface AccountCreateOrConnectWithoutUserInput {
    where: AccountWhereUniqueInput;
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>;
  }

  export interface AccountCreateManyUserInputEnvelope {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
    skipDuplicates?: boolean;
  }

  export interface CourseUpsertWithWhereUniqueWithoutOwnerInput {
    where: CourseWhereUniqueInput;
    update: XOR<CourseUpdateWithoutOwnerInput, CourseUncheckedUpdateWithoutOwnerInput>;
    create: XOR<CourseCreateWithoutOwnerInput, CourseUncheckedCreateWithoutOwnerInput>;
  }

  export interface CourseUpdateWithWhereUniqueWithoutOwnerInput {
    where: CourseWhereUniqueInput;
    data: XOR<CourseUpdateWithoutOwnerInput, CourseUncheckedUpdateWithoutOwnerInput>;
  }

  export interface CourseUpdateManyWithWhereWithoutOwnerInput {
    where: CourseScalarWhereInput;
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutOwnerInput>;
  }

  export interface CourseScalarWhereInput {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[];
    OR?: CourseScalarWhereInput[];
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[];
    id?: StringFilter<"Course"> | string;
    title?: StringFilter<"Course"> | string;
    description?: StringFilter<"Course"> | string;
    tags?: EnumCourseTagNullableListFilter<"Course">;
    coverImage?: StringNullableFilter<"Course"> | string | null;
    price?: FloatFilter<"Course"> | number;
    isPublished?: BoolFilter<"Course"> | boolean;
    createdAt?: DateTimeFilter<"Course"> | Date | string;
    updatedAt?: DateTimeFilter<"Course"> | Date | string;
    productId?: StringNullableFilter<"Course"> | string | null;
    ownerId?: StringFilter<"Course"> | string;
  }

  export interface CourseUpsertWithWhereUniqueWithoutStudentsInput {
    where: CourseWhereUniqueInput;
    update: XOR<CourseUpdateWithoutStudentsInput, CourseUncheckedUpdateWithoutStudentsInput>;
    create: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>;
  }

  export interface CourseUpdateWithWhereUniqueWithoutStudentsInput {
    where: CourseWhereUniqueInput;
    data: XOR<CourseUpdateWithoutStudentsInput, CourseUncheckedUpdateWithoutStudentsInput>;
  }

  export interface CourseUpdateManyWithWhereWithoutStudentsInput {
    where: CourseScalarWhereInput;
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutStudentsInput>;
  }

  export interface SessionUpsertWithWhereUniqueWithoutUserInput {
    where: SessionWhereUniqueInput;
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>;
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>;
  }

  export interface SessionUpdateWithWhereUniqueWithoutUserInput {
    where: SessionWhereUniqueInput;
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>;
  }

  export interface SessionUpdateManyWithWhereWithoutUserInput {
    where: SessionScalarWhereInput;
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>;
  }

  export interface SessionScalarWhereInput {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<"Session"> | string;
    expiresAt?: DateTimeFilter<"Session"> | Date | string;
    token?: StringFilter<"Session"> | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    ipAddress?: StringNullableFilter<"Session"> | string | null;
    userAgent?: StringNullableFilter<"Session"> | string | null;
    userId?: StringFilter<"Session"> | string;
    impersonatedBy?: StringNullableFilter<"Session"> | string | null;
  }

  export interface AccountUpsertWithWhereUniqueWithoutUserInput {
    where: AccountWhereUniqueInput;
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>;
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>;
  }

  export interface AccountUpdateWithWhereUniqueWithoutUserInput {
    where: AccountWhereUniqueInput;
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>;
  }

  export interface AccountUpdateManyWithWhereWithoutUserInput {
    where: AccountScalarWhereInput;
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>;
  }

  export interface AccountScalarWhereInput {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
    OR?: AccountScalarWhereInput[];
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
    id?: StringFilter<"Account"> | string;
    accountId?: StringFilter<"Account"> | string;
    providerId?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    accessToken?: StringNullableFilter<"Account"> | string | null;
    refreshToken?: StringNullableFilter<"Account"> | string | null;
    idToken?: StringNullableFilter<"Account"> | string | null;
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null;
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    password?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
  }

  export interface UserCreateWithoutOwnedCoursesInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    enrolledCourses?: CourseCreateNestedManyWithoutStudentsInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
  }

  export interface UserUncheckedCreateWithoutOwnedCoursesInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    enrolledCourses?: CourseUncheckedCreateNestedManyWithoutStudentsInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
  }

  export interface UserCreateOrConnectWithoutOwnedCoursesInput {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutOwnedCoursesInput, UserUncheckedCreateWithoutOwnedCoursesInput>;
  }

  export interface UserCreateWithoutEnrolledCoursesInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseCreateNestedManyWithoutOwnerInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
  }

  export interface UserUncheckedCreateWithoutEnrolledCoursesInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseUncheckedCreateNestedManyWithoutOwnerInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
  }

  export interface UserCreateOrConnectWithoutEnrolledCoursesInput {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutEnrolledCoursesInput, UserUncheckedCreateWithoutEnrolledCoursesInput>;
  }

  export interface ChapterCreateWithoutCourseInput {
    id?: string;
    title: string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
    lessons?: LessonCreateNestedManyWithoutChapterInput;
  }

  export interface ChapterUncheckedCreateWithoutCourseInput {
    id?: string;
    title: string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
    lessons?: LessonUncheckedCreateNestedManyWithoutChapterInput;
  }

  export interface ChapterCreateOrConnectWithoutCourseInput {
    where: ChapterWhereUniqueInput;
    create: XOR<ChapterCreateWithoutCourseInput, ChapterUncheckedCreateWithoutCourseInput>;
  }

  export interface ChapterCreateManyCourseInputEnvelope {
    data: ChapterCreateManyCourseInput | ChapterCreateManyCourseInput[];
    skipDuplicates?: boolean;
  }

  export interface ProgressCreateWithoutCourseInput {
    id?: string;
    userId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lesson: LessonCreateNestedOneWithoutProgressInput;
  }

  export interface ProgressUncheckedCreateWithoutCourseInput {
    id?: string;
    userId: string;
    lessonId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface ProgressCreateOrConnectWithoutCourseInput {
    where: ProgressWhereUniqueInput;
    create: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput>;
  }

  export interface ProgressCreateManyCourseInputEnvelope {
    data: ProgressCreateManyCourseInput | ProgressCreateManyCourseInput[];
    skipDuplicates?: boolean;
  }

  export interface UserUpsertWithoutOwnedCoursesInput {
    update: XOR<UserUpdateWithoutOwnedCoursesInput, UserUncheckedUpdateWithoutOwnedCoursesInput>;
    create: XOR<UserCreateWithoutOwnedCoursesInput, UserUncheckedCreateWithoutOwnedCoursesInput>;
    where?: UserWhereInput;
  }

  export interface UserUpdateToOneWithWhereWithoutOwnedCoursesInput {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutOwnedCoursesInput, UserUncheckedUpdateWithoutOwnedCoursesInput>;
  }

  export interface UserUpdateWithoutOwnedCoursesInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    enrolledCourses?: CourseUpdateManyWithoutStudentsNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
  }

  export interface UserUncheckedUpdateWithoutOwnedCoursesInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    enrolledCourses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
  }

  export interface UserUpsertWithWhereUniqueWithoutEnrolledCoursesInput {
    where: UserWhereUniqueInput;
    update: XOR<UserUpdateWithoutEnrolledCoursesInput, UserUncheckedUpdateWithoutEnrolledCoursesInput>;
    create: XOR<UserCreateWithoutEnrolledCoursesInput, UserUncheckedCreateWithoutEnrolledCoursesInput>;
  }

  export interface UserUpdateWithWhereUniqueWithoutEnrolledCoursesInput {
    where: UserWhereUniqueInput;
    data: XOR<UserUpdateWithoutEnrolledCoursesInput, UserUncheckedUpdateWithoutEnrolledCoursesInput>;
  }

  export interface UserUpdateManyWithWhereWithoutEnrolledCoursesInput {
    where: UserScalarWhereInput;
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutEnrolledCoursesInput>;
  }

  export interface UserScalarWhereInput {
    AND?: UserScalarWhereInput | UserScalarWhereInput[];
    OR?: UserScalarWhereInput[];
    NOT?: UserScalarWhereInput | UserScalarWhereInput[];
    id?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    name?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    emailVerified?: BoolFilter<"User"> | boolean;
    image?: StringNullableFilter<"User"> | string | null;
    roles?: EnumRoleNullableListFilter<"User">;
    role?: StringNullableFilter<"User"> | string | null;
    banned?: BoolNullableFilter<"User"> | boolean | null;
    banReason?: StringNullableFilter<"User"> | string | null;
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null;
  }

  export interface ChapterUpsertWithWhereUniqueWithoutCourseInput {
    where: ChapterWhereUniqueInput;
    update: XOR<ChapterUpdateWithoutCourseInput, ChapterUncheckedUpdateWithoutCourseInput>;
    create: XOR<ChapterCreateWithoutCourseInput, ChapterUncheckedCreateWithoutCourseInput>;
  }

  export interface ChapterUpdateWithWhereUniqueWithoutCourseInput {
    where: ChapterWhereUniqueInput;
    data: XOR<ChapterUpdateWithoutCourseInput, ChapterUncheckedUpdateWithoutCourseInput>;
  }

  export interface ChapterUpdateManyWithWhereWithoutCourseInput {
    where: ChapterScalarWhereInput;
    data: XOR<ChapterUpdateManyMutationInput, ChapterUncheckedUpdateManyWithoutCourseInput>;
  }

  export interface ChapterScalarWhereInput {
    AND?: ChapterScalarWhereInput | ChapterScalarWhereInput[];
    OR?: ChapterScalarWhereInput[];
    NOT?: ChapterScalarWhereInput | ChapterScalarWhereInput[];
    id?: StringFilter<"Chapter"> | string;
    title?: StringFilter<"Chapter"> | string;
    description?: StringFilter<"Chapter"> | string;
    courseId?: StringFilter<"Chapter"> | string;
    createdAt?: DateTimeFilter<"Chapter"> | Date | string;
    updatedAt?: DateTimeFilter<"Chapter"> | Date | string;
    isPublished?: BoolFilter<"Chapter"> | boolean;
    isFree?: BoolFilter<"Chapter"> | boolean;
  }

  export interface ProgressUpsertWithWhereUniqueWithoutCourseInput {
    where: ProgressWhereUniqueInput;
    update: XOR<ProgressUpdateWithoutCourseInput, ProgressUncheckedUpdateWithoutCourseInput>;
    create: XOR<ProgressCreateWithoutCourseInput, ProgressUncheckedCreateWithoutCourseInput>;
  }

  export interface ProgressUpdateWithWhereUniqueWithoutCourseInput {
    where: ProgressWhereUniqueInput;
    data: XOR<ProgressUpdateWithoutCourseInput, ProgressUncheckedUpdateWithoutCourseInput>;
  }

  export interface ProgressUpdateManyWithWhereWithoutCourseInput {
    where: ProgressScalarWhereInput;
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyWithoutCourseInput>;
  }

  export interface ProgressScalarWhereInput {
    AND?: ProgressScalarWhereInput | ProgressScalarWhereInput[];
    OR?: ProgressScalarWhereInput[];
    NOT?: ProgressScalarWhereInput | ProgressScalarWhereInput[];
    id?: StringFilter<"Progress"> | string;
    userId?: StringFilter<"Progress"> | string;
    lessonId?: StringFilter<"Progress"> | string;
    courseId?: StringFilter<"Progress"> | string;
    completed?: BoolFilter<"Progress"> | boolean;
    createdAt?: DateTimeFilter<"Progress"> | Date | string;
    updatedAt?: DateTimeFilter<"Progress"> | Date | string;
  }

  export interface CourseCreateWithoutChaptersInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    owner: UserCreateNestedOneWithoutOwnedCoursesInput;
    students?: UserCreateNestedManyWithoutEnrolledCoursesInput;
    progress?: ProgressCreateNestedManyWithoutCourseInput;
  }

  export interface CourseUncheckedCreateWithoutChaptersInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    ownerId: string;
    students?: UserUncheckedCreateNestedManyWithoutEnrolledCoursesInput;
    progress?: ProgressUncheckedCreateNestedManyWithoutCourseInput;
  }

  export interface CourseCreateOrConnectWithoutChaptersInput {
    where: CourseWhereUniqueInput;
    create: XOR<CourseCreateWithoutChaptersInput, CourseUncheckedCreateWithoutChaptersInput>;
  }

  export interface LessonCreateWithoutChapterInput {
    id?: string;
    title: string;
    content: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    progress?: ProgressCreateNestedManyWithoutLessonInput;
  }

  export interface LessonUncheckedCreateWithoutChapterInput {
    id?: string;
    title: string;
    content: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    progress?: ProgressUncheckedCreateNestedManyWithoutLessonInput;
  }

  export interface LessonCreateOrConnectWithoutChapterInput {
    where: LessonWhereUniqueInput;
    create: XOR<LessonCreateWithoutChapterInput, LessonUncheckedCreateWithoutChapterInput>;
  }

  export interface LessonCreateManyChapterInputEnvelope {
    data: LessonCreateManyChapterInput | LessonCreateManyChapterInput[];
    skipDuplicates?: boolean;
  }

  export interface CourseUpsertWithoutChaptersInput {
    update: XOR<CourseUpdateWithoutChaptersInput, CourseUncheckedUpdateWithoutChaptersInput>;
    create: XOR<CourseCreateWithoutChaptersInput, CourseUncheckedCreateWithoutChaptersInput>;
    where?: CourseWhereInput;
  }

  export interface CourseUpdateToOneWithWhereWithoutChaptersInput {
    where?: CourseWhereInput;
    data: XOR<CourseUpdateWithoutChaptersInput, CourseUncheckedUpdateWithoutChaptersInput>;
  }

  export interface CourseUpdateWithoutChaptersInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    owner?: UserUpdateOneRequiredWithoutOwnedCoursesNestedInput;
    students?: UserUpdateManyWithoutEnrolledCoursesNestedInput;
    progress?: ProgressUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateWithoutChaptersInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: StringFieldUpdateOperationsInput | string;
    students?: UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInput;
    progress?: ProgressUncheckedUpdateManyWithoutCourseNestedInput;
  }

  export interface LessonUpsertWithWhereUniqueWithoutChapterInput {
    where: LessonWhereUniqueInput;
    update: XOR<LessonUpdateWithoutChapterInput, LessonUncheckedUpdateWithoutChapterInput>;
    create: XOR<LessonCreateWithoutChapterInput, LessonUncheckedCreateWithoutChapterInput>;
  }

  export interface LessonUpdateWithWhereUniqueWithoutChapterInput {
    where: LessonWhereUniqueInput;
    data: XOR<LessonUpdateWithoutChapterInput, LessonUncheckedUpdateWithoutChapterInput>;
  }

  export interface LessonUpdateManyWithWhereWithoutChapterInput {
    where: LessonScalarWhereInput;
    data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyWithoutChapterInput>;
  }

  export interface LessonScalarWhereInput {
    AND?: LessonScalarWhereInput | LessonScalarWhereInput[];
    OR?: LessonScalarWhereInput[];
    NOT?: LessonScalarWhereInput | LessonScalarWhereInput[];
    id?: StringFilter<"Lesson"> | string;
    title?: StringFilter<"Lesson"> | string;
    content?: StringFilter<"Lesson"> | string;
    chapterId?: StringFilter<"Lesson"> | string;
    position?: IntFilter<"Lesson"> | number;
    isPublished?: BoolFilter<"Lesson"> | boolean;
    isFree?: BoolFilter<"Lesson"> | boolean;
    createdAt?: DateTimeFilter<"Lesson"> | Date | string;
    updatedAt?: DateTimeFilter<"Lesson"> | Date | string;
  }

  export interface ChapterCreateWithoutLessonsInput {
    id?: string;
    title: string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
    course: CourseCreateNestedOneWithoutChaptersInput;
  }

  export interface ChapterUncheckedCreateWithoutLessonsInput {
    id?: string;
    title: string;
    description: string;
    courseId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
  }

  export interface ChapterCreateOrConnectWithoutLessonsInput {
    where: ChapterWhereUniqueInput;
    create: XOR<ChapterCreateWithoutLessonsInput, ChapterUncheckedCreateWithoutLessonsInput>;
  }

  export interface ProgressCreateWithoutLessonInput {
    id?: string;
    userId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    course: CourseCreateNestedOneWithoutProgressInput;
  }

  export interface ProgressUncheckedCreateWithoutLessonInput {
    id?: string;
    userId: string;
    courseId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface ProgressCreateOrConnectWithoutLessonInput {
    where: ProgressWhereUniqueInput;
    create: XOR<ProgressCreateWithoutLessonInput, ProgressUncheckedCreateWithoutLessonInput>;
  }

  export interface ProgressCreateManyLessonInputEnvelope {
    data: ProgressCreateManyLessonInput | ProgressCreateManyLessonInput[];
    skipDuplicates?: boolean;
  }

  export interface ChapterUpsertWithoutLessonsInput {
    update: XOR<ChapterUpdateWithoutLessonsInput, ChapterUncheckedUpdateWithoutLessonsInput>;
    create: XOR<ChapterCreateWithoutLessonsInput, ChapterUncheckedCreateWithoutLessonsInput>;
    where?: ChapterWhereInput;
  }

  export interface ChapterUpdateToOneWithWhereWithoutLessonsInput {
    where?: ChapterWhereInput;
    data: XOR<ChapterUpdateWithoutLessonsInput, ChapterUncheckedUpdateWithoutLessonsInput>;
  }

  export interface ChapterUpdateWithoutLessonsInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    course?: CourseUpdateOneRequiredWithoutChaptersNestedInput;
  }

  export interface ChapterUncheckedUpdateWithoutLessonsInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
  }

  export interface ProgressUpsertWithWhereUniqueWithoutLessonInput {
    where: ProgressWhereUniqueInput;
    update: XOR<ProgressUpdateWithoutLessonInput, ProgressUncheckedUpdateWithoutLessonInput>;
    create: XOR<ProgressCreateWithoutLessonInput, ProgressUncheckedCreateWithoutLessonInput>;
  }

  export interface ProgressUpdateWithWhereUniqueWithoutLessonInput {
    where: ProgressWhereUniqueInput;
    data: XOR<ProgressUpdateWithoutLessonInput, ProgressUncheckedUpdateWithoutLessonInput>;
  }

  export interface ProgressUpdateManyWithWhereWithoutLessonInput {
    where: ProgressScalarWhereInput;
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyWithoutLessonInput>;
  }

  export interface LessonCreateWithoutProgressInput {
    id?: string;
    title: string;
    content: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    chapter: ChapterCreateNestedOneWithoutLessonsInput;
  }

  export interface LessonUncheckedCreateWithoutProgressInput {
    id?: string;
    title: string;
    content: string;
    chapterId: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface LessonCreateOrConnectWithoutProgressInput {
    where: LessonWhereUniqueInput;
    create: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>;
  }

  export interface CourseCreateWithoutProgressInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    owner: UserCreateNestedOneWithoutOwnedCoursesInput;
    students?: UserCreateNestedManyWithoutEnrolledCoursesInput;
    chapters?: ChapterCreateNestedManyWithoutCourseInput;
  }

  export interface CourseUncheckedCreateWithoutProgressInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
    ownerId: string;
    students?: UserUncheckedCreateNestedManyWithoutEnrolledCoursesInput;
    chapters?: ChapterUncheckedCreateNestedManyWithoutCourseInput;
  }

  export interface CourseCreateOrConnectWithoutProgressInput {
    where: CourseWhereUniqueInput;
    create: XOR<CourseCreateWithoutProgressInput, CourseUncheckedCreateWithoutProgressInput>;
  }

  export interface LessonUpsertWithoutProgressInput {
    update: XOR<LessonUpdateWithoutProgressInput, LessonUncheckedUpdateWithoutProgressInput>;
    create: XOR<LessonCreateWithoutProgressInput, LessonUncheckedCreateWithoutProgressInput>;
    where?: LessonWhereInput;
  }

  export interface LessonUpdateToOneWithWhereWithoutProgressInput {
    where?: LessonWhereInput;
    data: XOR<LessonUpdateWithoutProgressInput, LessonUncheckedUpdateWithoutProgressInput>;
  }

  export interface LessonUpdateWithoutProgressInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chapter?: ChapterUpdateOneRequiredWithoutLessonsNestedInput;
  }

  export interface LessonUncheckedUpdateWithoutProgressInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    chapterId?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface CourseUpsertWithoutProgressInput {
    update: XOR<CourseUpdateWithoutProgressInput, CourseUncheckedUpdateWithoutProgressInput>;
    create: XOR<CourseCreateWithoutProgressInput, CourseUncheckedCreateWithoutProgressInput>;
    where?: CourseWhereInput;
  }

  export interface CourseUpdateToOneWithWhereWithoutProgressInput {
    where?: CourseWhereInput;
    data: XOR<CourseUpdateWithoutProgressInput, CourseUncheckedUpdateWithoutProgressInput>;
  }

  export interface CourseUpdateWithoutProgressInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    owner?: UserUpdateOneRequiredWithoutOwnedCoursesNestedInput;
    students?: UserUpdateManyWithoutEnrolledCoursesNestedInput;
    chapters?: ChapterUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateWithoutProgressInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: StringFieldUpdateOperationsInput | string;
    students?: UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInput;
    chapters?: ChapterUncheckedUpdateManyWithoutCourseNestedInput;
  }

  export interface UserCreateWithoutSessionsInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseCreateNestedManyWithoutOwnerInput;
    enrolledCourses?: CourseCreateNestedManyWithoutStudentsInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
  }

  export interface UserUncheckedCreateWithoutSessionsInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseUncheckedCreateNestedManyWithoutOwnerInput;
    enrolledCourses?: CourseUncheckedCreateNestedManyWithoutStudentsInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
  }

  export interface UserCreateOrConnectWithoutSessionsInput {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
  }

  export interface UserUpsertWithoutSessionsInput {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>;
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    where?: UserWhereInput;
  }

  export interface UserUpdateToOneWithWhereWithoutSessionsInput {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>;
  }

  export interface UserUpdateWithoutSessionsInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUpdateManyWithoutOwnerNestedInput;
    enrolledCourses?: CourseUpdateManyWithoutStudentsNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
  }

  export interface UserUncheckedUpdateWithoutSessionsInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUncheckedUpdateManyWithoutOwnerNestedInput;
    enrolledCourses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
  }

  export interface UserCreateWithoutAccountsInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseCreateNestedManyWithoutOwnerInput;
    enrolledCourses?: CourseCreateNestedManyWithoutStudentsInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
  }

  export interface UserUncheckedCreateWithoutAccountsInput {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    emailVerified: boolean;
    image?: string | null;
    roles?: UserCreaterolesInput | $Enums.Role[];
    role?: string | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | string | null;
    ownedCourses?: CourseUncheckedCreateNestedManyWithoutOwnerInput;
    enrolledCourses?: CourseUncheckedCreateNestedManyWithoutStudentsInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
  }

  export interface UserCreateOrConnectWithoutAccountsInput {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>;
  }

  export interface UserUpsertWithoutAccountsInput {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>;
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>;
    where?: UserWhereInput;
  }

  export interface UserUpdateToOneWithWhereWithoutAccountsInput {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>;
  }

  export interface UserUpdateWithoutAccountsInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUpdateManyWithoutOwnerNestedInput;
    enrolledCourses?: CourseUpdateManyWithoutStudentsNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
  }

  export interface UserUncheckedUpdateWithoutAccountsInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUncheckedUpdateManyWithoutOwnerNestedInput;
    enrolledCourses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  }

  export interface CourseCreateManyOwnerInput {
    id?: string;
    title: string;
    description: string;
    tags?: CourseCreatetagsInput | $Enums.CourseTag[];
    coverImage?: string | null;
    price?: number;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productId?: string | null;
  }

  export interface SessionCreateManyUserInput {
    id: string;
    expiresAt: Date | string;
    token: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    ipAddress?: string | null;
    userAgent?: string | null;
    impersonatedBy?: string | null;
  }

  export interface AccountCreateManyUserInput {
    id: string;
    accountId: string;
    providerId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    accessTokenExpiresAt?: Date | string | null;
    refreshTokenExpiresAt?: Date | string | null;
    scope?: string | null;
    password?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export interface CourseUpdateWithoutOwnerInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    students?: UserUpdateManyWithoutEnrolledCoursesNestedInput;
    chapters?: ChapterUpdateManyWithoutCourseNestedInput;
    progress?: ProgressUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateWithoutOwnerInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    students?: UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInput;
    chapters?: ChapterUncheckedUpdateManyWithoutCourseNestedInput;
    progress?: ProgressUncheckedUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateManyWithoutOwnerInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface CourseUpdateWithoutStudentsInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    owner?: UserUpdateOneRequiredWithoutOwnedCoursesNestedInput;
    chapters?: ChapterUpdateManyWithoutCourseNestedInput;
    progress?: ProgressUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateWithoutStudentsInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: StringFieldUpdateOperationsInput | string;
    chapters?: ChapterUncheckedUpdateManyWithoutCourseNestedInput;
    progress?: ProgressUncheckedUpdateManyWithoutCourseNestedInput;
  }

  export interface CourseUncheckedUpdateManyWithoutStudentsInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    tags?: CourseUpdatetagsInput | $Enums.CourseTag[];
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productId?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: StringFieldUpdateOperationsInput | string;
  }

  export interface SessionUpdateWithoutUserInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface SessionUncheckedUpdateWithoutUserInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface SessionUncheckedUpdateManyWithoutUserInput {
    id?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    token?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null;
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null;
  }

  export interface AccountUpdateWithoutUserInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface AccountUncheckedUpdateWithoutUserInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface AccountUncheckedUpdateManyWithoutUserInput {
    id?: StringFieldUpdateOperationsInput | string;
    accountId?: StringFieldUpdateOperationsInput | string;
    providerId?: StringFieldUpdateOperationsInput | string;
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    idToken?: NullableStringFieldUpdateOperationsInput | string | null;
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ChapterCreateManyCourseInput {
    id?: string;
    title: string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    isFree?: boolean;
  }

  export interface ProgressCreateManyCourseInput {
    id?: string;
    userId: string;
    lessonId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface UserUpdateWithoutEnrolledCoursesInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUpdateManyWithoutOwnerNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
  }

  export interface UserUncheckedUpdateWithoutEnrolledCoursesInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownedCourses?: CourseUncheckedUpdateManyWithoutOwnerNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
  }

  export interface UserUncheckedUpdateManyWithoutEnrolledCoursesInput {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    roles?: UserUpdaterolesInput | $Enums.Role[];
    role?: NullableStringFieldUpdateOperationsInput | string | null;
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    banReason?: NullableStringFieldUpdateOperationsInput | string | null;
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  }

  export interface ChapterUpdateWithoutCourseInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    lessons?: LessonUpdateManyWithoutChapterNestedInput;
  }

  export interface ChapterUncheckedUpdateWithoutCourseInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    lessons?: LessonUncheckedUpdateManyWithoutChapterNestedInput;
  }

  export interface ChapterUncheckedUpdateManyWithoutCourseInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
  }

  export interface ProgressUpdateWithoutCourseInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    lesson?: LessonUpdateOneRequiredWithoutProgressNestedInput;
  }

  export interface ProgressUncheckedUpdateWithoutCourseInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    lessonId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ProgressUncheckedUpdateManyWithoutCourseInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    lessonId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface LessonCreateManyChapterInput {
    id?: string;
    title: string;
    content: string;
    position: number;
    isPublished?: boolean;
    isFree?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface LessonUpdateWithoutChapterInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    progress?: ProgressUpdateManyWithoutLessonNestedInput;
  }

  export interface LessonUncheckedUpdateWithoutChapterInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    progress?: ProgressUncheckedUpdateManyWithoutLessonNestedInput;
  }

  export interface LessonUncheckedUpdateManyWithoutChapterInput {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isPublished?: BoolFieldUpdateOperationsInput | boolean;
    isFree?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ProgressCreateManyLessonInput {
    id?: string;
    userId: string;
    courseId: string;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  export interface ProgressUpdateWithoutLessonInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    course?: CourseUpdateOneRequiredWithoutProgressNestedInput;
  }

  export interface ProgressUncheckedUpdateWithoutLessonInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  export interface ProgressUncheckedUpdateManyWithoutLessonInput {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    courseId?: StringFieldUpdateOperationsInput | string;
    completed?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  }

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export interface BatchPayload {
    count: number;
  }
}
