import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','createdAt','updatedAt','emailVerified','image','roles']);

export const CourseScalarFieldEnumSchema = z.enum(['id','title','description','tags','coverImage','price','isPublished','createdAt','updatedAt','ownerId']);

export const ChapterScalarFieldEnumSchema = z.enum(['id','title','description','courseId','createdAt','updatedAt','isPublished','isFree']);

export const LessonScalarFieldEnumSchema = z.enum(['id','title','content','chapterId','position','isPublished','isFree','createdAt','updatedAt']);

export const ProgressScalarFieldEnumSchema = z.enum(['id','userId','lessonId','courseId','completed','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ADMIN','CREATOR','STUDENT']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const CourseTagSchema = z.enum(['JAVASCRIPT','TYPESCRIPT','REACT','NEXTJS','NODE','PYTHON','JAVA','GOLANG','CSS','HTML','DESIGN','DEVOPS','DATABASE','MOBILE','TESTING','SECURITY','TECHNICAL_WRITING','MARKETING']);

export type CourseTagType = `${z.infer<typeof CourseTagSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  roles: RoleSchema.array(),
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const CourseSchema = z.object({
  tags: CourseTagSchema.array(),
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  coverImage: z.string().nullable(),
  price: z.number(),
  isPublished: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ownerId: z.string(),
})

export type Course = z.infer<typeof CourseSchema>

/////////////////////////////////////////
// CHAPTER SCHEMA
/////////////////////////////////////////

export const ChapterSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isPublished: z.boolean(),
  isFree: z.boolean(),
})

export type Chapter = z.infer<typeof ChapterSchema>

/////////////////////////////////////////
// LESSON SCHEMA
/////////////////////////////////////////

export const LessonSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  chapterId: z.string(),
  position: z.number().int(),
  isPublished: z.boolean(),
  isFree: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Lesson = z.infer<typeof LessonSchema>

/////////////////////////////////////////
// PROGRESS SCHEMA
/////////////////////////////////////////

export const ProgressSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  lessonId: z.string(),
  courseId: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Progress = z.infer<typeof ProgressSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  ownedCourses: z.union([z.boolean(),z.lazy(() => CourseFindManyArgsSchema)]).optional(),
  enrolledCourses: z.union([z.boolean(),z.lazy(() => CourseFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  ownedCourses: z.boolean().optional(),
  enrolledCourses: z.boolean().optional(),
  sessions: z.boolean().optional(),
  accounts: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  roles: z.boolean().optional(),
  ownedCourses: z.union([z.boolean(),z.lazy(() => CourseFindManyArgsSchema)]).optional(),
  enrolledCourses: z.union([z.boolean(),z.lazy(() => CourseFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COURSE
//------------------------------------------------------

export const CourseIncludeSchema: z.ZodType<Prisma.CourseInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  chapters: z.union([z.boolean(),z.lazy(() => ChapterFindManyArgsSchema)]).optional(),
  progress: z.union([z.boolean(),z.lazy(() => ProgressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CourseArgsSchema: z.ZodType<Prisma.CourseDefaultArgs> = z.object({
  select: z.lazy(() => CourseSelectSchema).optional(),
  include: z.lazy(() => CourseIncludeSchema).optional(),
}).strict();

export const CourseCountOutputTypeArgsSchema: z.ZodType<Prisma.CourseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CourseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CourseCountOutputTypeSelectSchema: z.ZodType<Prisma.CourseCountOutputTypeSelect> = z.object({
  students: z.boolean().optional(),
  chapters: z.boolean().optional(),
  progress: z.boolean().optional(),
}).strict();

export const CourseSelectSchema: z.ZodType<Prisma.CourseSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  tags: z.boolean().optional(),
  coverImage: z.boolean().optional(),
  price: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  chapters: z.union([z.boolean(),z.lazy(() => ChapterFindManyArgsSchema)]).optional(),
  progress: z.union([z.boolean(),z.lazy(() => ProgressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAPTER
//------------------------------------------------------

export const ChapterIncludeSchema: z.ZodType<Prisma.ChapterInclude> = z.object({
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChapterCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChapterArgsSchema: z.ZodType<Prisma.ChapterDefaultArgs> = z.object({
  select: z.lazy(() => ChapterSelectSchema).optional(),
  include: z.lazy(() => ChapterIncludeSchema).optional(),
}).strict();

export const ChapterCountOutputTypeArgsSchema: z.ZodType<Prisma.ChapterCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ChapterCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChapterCountOutputTypeSelectSchema: z.ZodType<Prisma.ChapterCountOutputTypeSelect> = z.object({
  lessons: z.boolean().optional(),
}).strict();

export const ChapterSelectSchema: z.ZodType<Prisma.ChapterSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  courseId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChapterCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LESSON
//------------------------------------------------------

export const LessonIncludeSchema: z.ZodType<Prisma.LessonInclude> = z.object({
  chapter: z.union([z.boolean(),z.lazy(() => ChapterArgsSchema)]).optional(),
  progress: z.union([z.boolean(),z.lazy(() => ProgressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LessonCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LessonArgsSchema: z.ZodType<Prisma.LessonDefaultArgs> = z.object({
  select: z.lazy(() => LessonSelectSchema).optional(),
  include: z.lazy(() => LessonIncludeSchema).optional(),
}).strict();

export const LessonCountOutputTypeArgsSchema: z.ZodType<Prisma.LessonCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LessonCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LessonCountOutputTypeSelectSchema: z.ZodType<Prisma.LessonCountOutputTypeSelect> = z.object({
  progress: z.boolean().optional(),
}).strict();

export const LessonSelectSchema: z.ZodType<Prisma.LessonSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  chapterId: z.boolean().optional(),
  position: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  chapter: z.union([z.boolean(),z.lazy(() => ChapterArgsSchema)]).optional(),
  progress: z.union([z.boolean(),z.lazy(() => ProgressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LessonCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROGRESS
//------------------------------------------------------

export const ProgressIncludeSchema: z.ZodType<Prisma.ProgressInclude> = z.object({
  lesson: z.union([z.boolean(),z.lazy(() => LessonArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
}).strict()

export const ProgressArgsSchema: z.ZodType<Prisma.ProgressDefaultArgs> = z.object({
  select: z.lazy(() => ProgressSelectSchema).optional(),
  include: z.lazy(() => ProgressIncludeSchema).optional(),
}).strict();

export const ProgressSelectSchema: z.ZodType<Prisma.ProgressSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  lessonId: z.boolean().optional(),
  courseId: z.boolean().optional(),
  completed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  lesson: z.union([z.boolean(),z.lazy(() => LessonArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  accountId: z.boolean().optional(),
  providerId: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  idToken: z.boolean().optional(),
  accessTokenExpiresAt: z.boolean().optional(),
  refreshTokenExpiresAt: z.boolean().optional(),
  scope: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  value: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  ownedCourses: z.lazy(() => CourseListRelationFilterSchema).optional(),
  enrolledCourses: z.lazy(() => CourseListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roles: z.lazy(() => SortOrderSchema).optional(),
  ownedCourses: z.lazy(() => CourseOrderByRelationAggregateInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
  ownedCourses: z.lazy(() => CourseListRelationFilterSchema).optional(),
  enrolledCourses: z.lazy(() => CourseListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roles: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional()
}).strict();

export const CourseWhereInputSchema: z.ZodType<Prisma.CourseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => EnumCourseTagNullableListFilterSchema).optional(),
  coverImage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  students: z.lazy(() => UserListRelationFilterSchema).optional(),
  chapters: z.lazy(() => ChapterListRelationFilterSchema).optional(),
  progress: z.lazy(() => ProgressListRelationFilterSchema).optional()
}).strict();

export const CourseOrderByWithRelationInputSchema: z.ZodType<Prisma.CourseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  students: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  chapters: z.lazy(() => ChapterOrderByRelationAggregateInputSchema).optional(),
  progress: z.lazy(() => ProgressOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CourseWhereUniqueInputSchema: z.ZodType<Prisma.CourseWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseWhereInputSchema),z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => EnumCourseTagNullableListFilterSchema).optional(),
  coverImage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  owner: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  students: z.lazy(() => UserListRelationFilterSchema).optional(),
  chapters: z.lazy(() => ChapterListRelationFilterSchema).optional(),
  progress: z.lazy(() => ProgressListRelationFilterSchema).optional()
}).strict());

export const CourseOrderByWithAggregationInputSchema: z.ZodType<Prisma.CourseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CourseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CourseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CourseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CourseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CourseSumOrderByAggregateInputSchema).optional()
}).strict();

export const CourseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CourseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CourseScalarWhereWithAggregatesInputSchema),z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseScalarWhereWithAggregatesInputSchema),z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => EnumCourseTagNullableListFilterSchema).optional(),
  coverImage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ChapterWhereInputSchema: z.ZodType<Prisma.ChapterWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChapterWhereInputSchema),z.lazy(() => ChapterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChapterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChapterWhereInputSchema),z.lazy(() => ChapterWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  course: z.union([ z.lazy(() => CourseScalarRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional()
}).strict();

export const ChapterOrderByWithRelationInputSchema: z.ZodType<Prisma.ChapterOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  course: z.lazy(() => CourseOrderByWithRelationInputSchema).optional(),
  lessons: z.lazy(() => LessonOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ChapterWhereUniqueInputSchema: z.ZodType<Prisma.ChapterWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ChapterWhereInputSchema),z.lazy(() => ChapterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChapterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChapterWhereInputSchema),z.lazy(() => ChapterWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  course: z.union([ z.lazy(() => CourseScalarRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional()
}).strict());

export const ChapterOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChapterOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChapterCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChapterMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChapterMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChapterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChapterScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChapterScalarWhereWithAggregatesInputSchema),z.lazy(() => ChapterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChapterScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChapterScalarWhereWithAggregatesInputSchema),z.lazy(() => ChapterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const LessonWhereInputSchema: z.ZodType<Prisma.LessonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LessonWhereInputSchema),z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonWhereInputSchema),z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chapterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  chapter: z.union([ z.lazy(() => ChapterScalarRelationFilterSchema),z.lazy(() => ChapterWhereInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressListRelationFilterSchema).optional()
}).strict();

export const LessonOrderByWithRelationInputSchema: z.ZodType<Prisma.LessonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  chapterId: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  chapter: z.lazy(() => ChapterOrderByWithRelationInputSchema).optional(),
  progress: z.lazy(() => ProgressOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LessonWhereUniqueInputSchema: z.ZodType<Prisma.LessonWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => LessonWhereInputSchema),z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonWhereInputSchema),z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chapterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  chapter: z.union([ z.lazy(() => ChapterScalarRelationFilterSchema),z.lazy(() => ChapterWhereInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressListRelationFilterSchema).optional()
}).strict());

export const LessonOrderByWithAggregationInputSchema: z.ZodType<Prisma.LessonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  chapterId: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LessonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LessonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LessonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LessonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LessonSumOrderByAggregateInputSchema).optional()
}).strict();

export const LessonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LessonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LessonScalarWhereWithAggregatesInputSchema),z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonScalarWhereWithAggregatesInputSchema),z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  chapterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProgressWhereInputSchema: z.ZodType<Prisma.ProgressWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lessonId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lesson: z.union([ z.lazy(() => LessonScalarRelationFilterSchema),z.lazy(() => LessonWhereInputSchema) ]).optional(),
  course: z.union([ z.lazy(() => CourseScalarRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
}).strict();

export const ProgressOrderByWithRelationInputSchema: z.ZodType<Prisma.ProgressOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lessonId: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lesson: z.lazy(() => LessonOrderByWithRelationInputSchema).optional(),
  course: z.lazy(() => CourseOrderByWithRelationInputSchema).optional()
}).strict();

export const ProgressWhereUniqueInputSchema: z.ZodType<Prisma.ProgressWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId_lessonId: z.lazy(() => ProgressUserIdLessonIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId_lessonId: z.lazy(() => ProgressUserIdLessonIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId_lessonId: z.lazy(() => ProgressUserIdLessonIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lessonId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lesson: z.union([ z.lazy(() => LessonScalarRelationFilterSchema),z.lazy(() => LessonWhereInputSchema) ]).optional(),
  course: z.union([ z.lazy(() => CourseScalarRelationFilterSchema),z.lazy(() => CourseWhereInputSchema) ]).optional(),
}).strict());

export const ProgressOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProgressOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lessonId: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProgressCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProgressMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProgressMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProgressScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProgressScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema),z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema),z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lessonId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseCreateNestedManyWithoutOwnerInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseCreateNestedManyWithoutStudentsInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutStudentsInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUpdateManyWithoutOwnerNestedInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUpdateManyWithoutStudentsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutStudentsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict();

export const CourseCreateInputSchema: z.ZodType<Prisma.CourseCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedCoursesInputSchema),
  students: z.lazy(() => UserCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  chapters: z.lazy(() => ChapterCreateNestedManyWithoutCourseInputSchema).optional(),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateInputSchema: z.ZodType<Prisma.CourseUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  chapters: z.lazy(() => ChapterUncheckedCreateNestedManyWithoutCourseInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUpdateInputSchema: z.ZodType<Prisma.CourseUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedCoursesNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUpdateManyWithoutCourseNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUncheckedUpdateManyWithoutCourseNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseCreateManyInputSchema: z.ZodType<Prisma.CourseCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string()
}).strict();

export const CourseUpdateManyMutationInputSchema: z.ZodType<Prisma.CourseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChapterCreateInputSchema: z.ZodType<Prisma.ChapterCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  course: z.lazy(() => CourseCreateNestedOneWithoutChaptersInputSchema),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutChapterInputSchema).optional()
}).strict();

export const ChapterUncheckedCreateInputSchema: z.ZodType<Prisma.ChapterUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutChapterInputSchema).optional()
}).strict();

export const ChapterUpdateInputSchema: z.ZodType<Prisma.ChapterUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutChaptersNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutChapterNestedInputSchema).optional()
}).strict();

export const ChapterUncheckedUpdateInputSchema: z.ZodType<Prisma.ChapterUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutChapterNestedInputSchema).optional()
}).strict();

export const ChapterCreateManyInputSchema: z.ZodType<Prisma.ChapterCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional()
}).strict();

export const ChapterUpdateManyMutationInputSchema: z.ZodType<Prisma.ChapterUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChapterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChapterUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LessonCreateInputSchema: z.ZodType<Prisma.LessonCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  chapter: z.lazy(() => ChapterCreateNestedOneWithoutLessonsInputSchema),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutLessonInputSchema).optional()
}).strict();

export const LessonUncheckedCreateInputSchema: z.ZodType<Prisma.LessonUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  chapterId: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutLessonInputSchema).optional()
}).strict();

export const LessonUpdateInputSchema: z.ZodType<Prisma.LessonUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chapter: z.lazy(() => ChapterUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutLessonNestedInputSchema).optional()
}).strict();

export const LessonUncheckedUpdateInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chapterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutLessonNestedInputSchema).optional()
}).strict();

export const LessonCreateManyInputSchema: z.ZodType<Prisma.LessonCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  chapterId: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LessonUpdateManyMutationInputSchema: z.ZodType<Prisma.LessonUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LessonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chapterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressCreateInputSchema: z.ZodType<Prisma.ProgressCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lesson: z.lazy(() => LessonCreateNestedOneWithoutProgressInputSchema),
  course: z.lazy(() => CourseCreateNestedOneWithoutProgressInputSchema)
}).strict();

export const ProgressUncheckedCreateInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  lessonId: z.string(),
  courseId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUpdateInputSchema: z.ZodType<Prisma.ProgressUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lesson: z.lazy(() => LessonUpdateOneRequiredWithoutProgressNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutProgressNestedInputSchema).optional()
}).strict();

export const ProgressUncheckedUpdateInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lessonId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressCreateManyInputSchema: z.ZodType<Prisma.ProgressCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  lessonId: z.string(),
  courseId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUpdateManyMutationInputSchema: z.ZodType<Prisma.ProgressUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lessonId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumRoleNullableListFilterSchema: z.ZodType<Prisma.EnumRoleNullableListFilter> = z.object({
  equals: z.lazy(() => RoleSchema).array().optional().nullable(),
  has: z.lazy(() => RoleSchema).optional().nullable(),
  hasEvery: z.lazy(() => RoleSchema).array().optional(),
  hasSome: z.lazy(() => RoleSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const CourseListRelationFilterSchema: z.ZodType<Prisma.CourseListRelationFilter> = z.object({
  every: z.lazy(() => CourseWhereInputSchema).optional(),
  some: z.lazy(() => CourseWhereInputSchema).optional(),
  none: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const CourseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CourseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  roles: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumCourseTagNullableListFilterSchema: z.ZodType<Prisma.EnumCourseTagNullableListFilter> = z.object({
  equals: z.lazy(() => CourseTagSchema).array().optional().nullable(),
  has: z.lazy(() => CourseTagSchema).optional().nullable(),
  hasEvery: z.lazy(() => CourseTagSchema).array().optional(),
  hasSome: z.lazy(() => CourseTagSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ChapterListRelationFilterSchema: z.ZodType<Prisma.ChapterListRelationFilter> = z.object({
  every: z.lazy(() => ChapterWhereInputSchema).optional(),
  some: z.lazy(() => ChapterWhereInputSchema).optional(),
  none: z.lazy(() => ChapterWhereInputSchema).optional()
}).strict();

export const ProgressListRelationFilterSchema: z.ZodType<Prisma.ProgressListRelationFilter> = z.object({
  every: z.lazy(() => ProgressWhereInputSchema).optional(),
  some: z.lazy(() => ProgressWhereInputSchema).optional(),
  none: z.lazy(() => ProgressWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChapterOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChapterOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProgressOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseCountOrderByAggregateInputSchema: z.ZodType<Prisma.CourseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CourseAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CourseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseMinOrderByAggregateInputSchema: z.ZodType<Prisma.CourseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  coverImage: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CourseSumOrderByAggregateInputSchema: z.ZodType<Prisma.CourseSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const CourseScalarRelationFilterSchema: z.ZodType<Prisma.CourseScalarRelationFilter> = z.object({
  is: z.lazy(() => CourseWhereInputSchema).optional(),
  isNot: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const LessonListRelationFilterSchema: z.ZodType<Prisma.LessonListRelationFilter> = z.object({
  every: z.lazy(() => LessonWhereInputSchema).optional(),
  some: z.lazy(() => LessonWhereInputSchema).optional(),
  none: z.lazy(() => LessonWhereInputSchema).optional()
}).strict();

export const LessonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LessonOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChapterCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChapterCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChapterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChapterMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChapterMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChapterMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const ChapterScalarRelationFilterSchema: z.ZodType<Prisma.ChapterScalarRelationFilter> = z.object({
  is: z.lazy(() => ChapterWhereInputSchema).optional(),
  isNot: z.lazy(() => ChapterWhereInputSchema).optional()
}).strict();

export const LessonCountOrderByAggregateInputSchema: z.ZodType<Prisma.LessonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  chapterId: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LessonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LessonAvgOrderByAggregateInput> = z.object({
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LessonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  chapterId: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LessonMinOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  chapterId: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isFree: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LessonSumOrderByAggregateInputSchema: z.ZodType<Prisma.LessonSumOrderByAggregateInput> = z.object({
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const LessonScalarRelationFilterSchema: z.ZodType<Prisma.LessonScalarRelationFilter> = z.object({
  is: z.lazy(() => LessonWhereInputSchema).optional(),
  isNot: z.lazy(() => LessonWhereInputSchema).optional()
}).strict();

export const ProgressUserIdLessonIdCompoundUniqueInputSchema: z.ZodType<Prisma.ProgressUserIdLessonIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  lessonId: z.string()
}).strict();

export const ProgressCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lessonId: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lessonId: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lessonId: z.lazy(() => SortOrderSchema).optional(),
  courseId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreaterolesInputSchema: z.ZodType<Prisma.UserCreaterolesInput> = z.object({
  set: z.lazy(() => RoleSchema).array()
}).strict();

export const CourseCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.CourseCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutOwnerInputSchema),z.lazy(() => CourseCreateWithoutOwnerInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseCreateNestedManyWithoutStudentsInputSchema: z.ZodType<Prisma.CourseCreateNestedManyWithoutStudentsInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutStudentsInputSchema),z.lazy(() => CourseCreateWithoutStudentsInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema),z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutOwnerInputSchema),z.lazy(() => CourseCreateWithoutOwnerInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseUncheckedCreateNestedManyWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUncheckedCreateNestedManyWithoutStudentsInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutStudentsInputSchema),z.lazy(() => CourseCreateWithoutStudentsInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema),z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdaterolesInputSchema: z.ZodType<Prisma.UserUpdaterolesInput> = z.object({
  set: z.lazy(() => RoleSchema).array().optional(),
  push: z.union([ z.lazy(() => RoleSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict();

export const CourseUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CourseUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutOwnerInputSchema),z.lazy(() => CourseCreateWithoutOwnerInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CourseUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CourseUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => CourseUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseScalarWhereInputSchema),z.lazy(() => CourseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseUpdateManyWithoutStudentsNestedInputSchema: z.ZodType<Prisma.CourseUpdateManyWithoutStudentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutStudentsInputSchema),z.lazy(() => CourseCreateWithoutStudentsInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema),z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseUpsertWithWhereUniqueWithoutStudentsInputSchema),z.lazy(() => CourseUpsertWithWhereUniqueWithoutStudentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseUpdateWithWhereUniqueWithoutStudentsInputSchema),z.lazy(() => CourseUpdateWithWhereUniqueWithoutStudentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseUpdateManyWithWhereWithoutStudentsInputSchema),z.lazy(() => CourseUpdateManyWithWhereWithoutStudentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseScalarWhereInputSchema),z.lazy(() => CourseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutOwnerInputSchema),z.lazy(() => CourseCreateWithoutOwnerInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CourseCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CourseUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CourseCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CourseUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => CourseUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseScalarWhereInputSchema),z.lazy(() => CourseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseUncheckedUpdateManyWithoutStudentsNestedInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyWithoutStudentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutStudentsInputSchema),z.lazy(() => CourseCreateWithoutStudentsInputSchema).array(),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema),z.lazy(() => CourseCreateOrConnectWithoutStudentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CourseUpsertWithWhereUniqueWithoutStudentsInputSchema),z.lazy(() => CourseUpsertWithWhereUniqueWithoutStudentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CourseWhereUniqueInputSchema),z.lazy(() => CourseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CourseUpdateWithWhereUniqueWithoutStudentsInputSchema),z.lazy(() => CourseUpdateWithWhereUniqueWithoutStudentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CourseUpdateManyWithWhereWithoutStudentsInputSchema),z.lazy(() => CourseUpdateManyWithWhereWithoutStudentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CourseScalarWhereInputSchema),z.lazy(() => CourseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseCreatetagsInputSchema: z.ZodType<Prisma.CourseCreatetagsInput> = z.object({
  set: z.lazy(() => CourseTagSchema).array()
}).strict();

export const UserCreateNestedOneWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOwnedCoursesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedCoursesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOwnedCoursesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutEnrolledCoursesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChapterCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.ChapterCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => ChapterCreateWithoutCourseInputSchema),z.lazy(() => ChapterCreateWithoutCourseInputSchema).array(),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChapterCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProgressCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.ProgressCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutCourseInputSchema),z.lazy(() => ProgressCreateWithoutCourseInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutEnrolledCoursesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChapterUncheckedCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUncheckedCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => ChapterCreateWithoutCourseInputSchema),z.lazy(() => ChapterCreateWithoutCourseInputSchema).array(),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChapterCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProgressUncheckedCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateNestedManyWithoutCourseInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutCourseInputSchema),z.lazy(() => ProgressCreateWithoutCourseInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseUpdatetagsInputSchema: z.ZodType<Prisma.CourseUpdatetagsInput> = z.object({
  set: z.lazy(() => CourseTagSchema).array().optional(),
  push: z.union([ z.lazy(() => CourseTagSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutOwnedCoursesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOwnedCoursesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedCoursesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOwnedCoursesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOwnedCoursesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutOwnedCoursesInputSchema),z.lazy(() => UserUpdateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwnedCoursesInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyWithoutEnrolledCoursesNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutEnrolledCoursesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChapterUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.ChapterUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChapterCreateWithoutCourseInputSchema),z.lazy(() => ChapterCreateWithoutCourseInputSchema).array(),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChapterUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ChapterUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChapterCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChapterUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ChapterUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChapterUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => ChapterUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChapterScalarWhereInputSchema),z.lazy(() => ChapterScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProgressUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.ProgressUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutCourseInputSchema),z.lazy(() => ProgressCreateWithoutCourseInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgressUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ProgressUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgressUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ProgressUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgressUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => ProgressUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema),z.lazy(() => UserCreateOrConnectWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutEnrolledCoursesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChapterUncheckedUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.ChapterUncheckedUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChapterCreateWithoutCourseInputSchema),z.lazy(() => ChapterCreateWithoutCourseInputSchema).array(),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ChapterCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChapterUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ChapterUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChapterCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChapterWhereUniqueInputSchema),z.lazy(() => ChapterWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChapterUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ChapterUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChapterUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => ChapterUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChapterScalarWhereInputSchema),z.lazy(() => ChapterScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyWithoutCourseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutCourseInputSchema),z.lazy(() => ProgressCreateWithoutCourseInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgressUpsertWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ProgressUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgressUpdateWithWhereUniqueWithoutCourseInputSchema),z.lazy(() => ProgressUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgressUpdateManyWithWhereWithoutCourseInputSchema),z.lazy(() => ProgressUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CourseCreateNestedOneWithoutChaptersInputSchema: z.ZodType<Prisma.CourseCreateNestedOneWithoutChaptersInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedCreateWithoutChaptersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutChaptersInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional()
}).strict();

export const LessonCreateNestedManyWithoutChapterInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutChapterInput> = z.object({
  create: z.union([ z.lazy(() => LessonCreateWithoutChapterInputSchema),z.lazy(() => LessonCreateWithoutChapterInputSchema).array(),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema),z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyChapterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LessonUncheckedCreateNestedManyWithoutChapterInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput> = z.object({
  create: z.union([ z.lazy(() => LessonCreateWithoutChapterInputSchema),z.lazy(() => LessonCreateWithoutChapterInputSchema).array(),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema),z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyChapterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CourseUpdateOneRequiredWithoutChaptersNestedInputSchema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutChaptersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedCreateWithoutChaptersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutChaptersInputSchema).optional(),
  upsert: z.lazy(() => CourseUpsertWithoutChaptersInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CourseUpdateToOneWithWhereWithoutChaptersInputSchema),z.lazy(() => CourseUpdateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutChaptersInputSchema) ]).optional(),
}).strict();

export const LessonUpdateManyWithoutChapterNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutChapterNestedInput> = z.object({
  create: z.union([ z.lazy(() => LessonCreateWithoutChapterInputSchema),z.lazy(() => LessonCreateWithoutChapterInputSchema).array(),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema),z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutChapterInputSchema),z.lazy(() => LessonUpsertWithWhereUniqueWithoutChapterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyChapterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutChapterInputSchema),z.lazy(() => LessonUpdateWithWhereUniqueWithoutChapterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutChapterInputSchema),z.lazy(() => LessonUpdateManyWithWhereWithoutChapterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema),z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LessonUncheckedUpdateManyWithoutChapterNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput> = z.object({
  create: z.union([ z.lazy(() => LessonCreateWithoutChapterInputSchema),z.lazy(() => LessonCreateWithoutChapterInputSchema).array(),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema),z.lazy(() => LessonCreateOrConnectWithoutChapterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutChapterInputSchema),z.lazy(() => LessonUpsertWithWhereUniqueWithoutChapterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyChapterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema),z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutChapterInputSchema),z.lazy(() => LessonUpdateWithWhereUniqueWithoutChapterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutChapterInputSchema),z.lazy(() => LessonUpdateManyWithWhereWithoutChapterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema),z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChapterCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterCreateNestedOneWithoutLessonsInput> = z.object({
  create: z.union([ z.lazy(() => ChapterCreateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChapterCreateOrConnectWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => ChapterWhereUniqueInputSchema).optional()
}).strict();

export const ProgressCreateNestedManyWithoutLessonInputSchema: z.ZodType<Prisma.ProgressCreateNestedManyWithoutLessonInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutLessonInputSchema),z.lazy(() => ProgressCreateWithoutLessonInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyLessonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProgressUncheckedCreateNestedManyWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateNestedManyWithoutLessonInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutLessonInputSchema),z.lazy(() => ProgressCreateWithoutLessonInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyLessonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ChapterUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.ChapterUpdateOneRequiredWithoutLessonsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChapterCreateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChapterCreateOrConnectWithoutLessonsInputSchema).optional(),
  upsert: z.lazy(() => ChapterUpsertWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => ChapterWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChapterUpdateToOneWithWhereWithoutLessonsInputSchema),z.lazy(() => ChapterUpdateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedUpdateWithoutLessonsInputSchema) ]).optional(),
}).strict();

export const ProgressUpdateManyWithoutLessonNestedInputSchema: z.ZodType<Prisma.ProgressUpdateManyWithoutLessonNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutLessonInputSchema),z.lazy(() => ProgressCreateWithoutLessonInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgressUpsertWithWhereUniqueWithoutLessonInputSchema),z.lazy(() => ProgressUpsertWithWhereUniqueWithoutLessonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyLessonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgressUpdateWithWhereUniqueWithoutLessonInputSchema),z.lazy(() => ProgressUpdateWithWhereUniqueWithoutLessonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgressUpdateManyWithWhereWithoutLessonInputSchema),z.lazy(() => ProgressUpdateManyWithWhereWithoutLessonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyWithoutLessonNestedInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyWithoutLessonNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutLessonInputSchema),z.lazy(() => ProgressCreateWithoutLessonInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutLessonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgressUpsertWithWhereUniqueWithoutLessonInputSchema),z.lazy(() => ProgressUpsertWithWhereUniqueWithoutLessonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyLessonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgressUpdateWithWhereUniqueWithoutLessonInputSchema),z.lazy(() => ProgressUpdateWithWhereUniqueWithoutLessonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgressUpdateManyWithWhereWithoutLessonInputSchema),z.lazy(() => ProgressUpdateManyWithWhereWithoutLessonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LessonCreateNestedOneWithoutProgressInputSchema: z.ZodType<Prisma.LessonCreateNestedOneWithoutProgressInput> = z.object({
  create: z.union([ z.lazy(() => LessonCreateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedCreateWithoutProgressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LessonCreateOrConnectWithoutProgressInputSchema).optional(),
  connect: z.lazy(() => LessonWhereUniqueInputSchema).optional()
}).strict();

export const CourseCreateNestedOneWithoutProgressInputSchema: z.ZodType<Prisma.CourseCreateNestedOneWithoutProgressInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedCreateWithoutProgressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutProgressInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional()
}).strict();

export const LessonUpdateOneRequiredWithoutProgressNestedInputSchema: z.ZodType<Prisma.LessonUpdateOneRequiredWithoutProgressNestedInput> = z.object({
  create: z.union([ z.lazy(() => LessonCreateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedCreateWithoutProgressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LessonCreateOrConnectWithoutProgressInputSchema).optional(),
  upsert: z.lazy(() => LessonUpsertWithoutProgressInputSchema).optional(),
  connect: z.lazy(() => LessonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LessonUpdateToOneWithWhereWithoutProgressInputSchema),z.lazy(() => LessonUpdateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedUpdateWithoutProgressInputSchema) ]).optional(),
}).strict();

export const CourseUpdateOneRequiredWithoutProgressNestedInputSchema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutProgressNestedInput> = z.object({
  create: z.union([ z.lazy(() => CourseCreateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedCreateWithoutProgressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutProgressInputSchema).optional(),
  upsert: z.lazy(() => CourseUpsertWithoutProgressInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CourseUpdateToOneWithWhereWithoutProgressInputSchema),z.lazy(() => CourseUpdateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutProgressInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const CourseCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CourseCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  students: z.lazy(() => UserCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  chapters: z.lazy(() => ChapterCreateNestedManyWithoutCourseInputSchema).optional(),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  chapters: z.lazy(() => ChapterUncheckedCreateNestedManyWithoutCourseInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CourseCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.CourseCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CourseCreateManyOwnerInputSchema),z.lazy(() => CourseCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CourseCreateWithoutStudentsInputSchema: z.ZodType<Prisma.CourseCreateWithoutStudentsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedCoursesInputSchema),
  chapters: z.lazy(() => ChapterCreateNestedManyWithoutCourseInputSchema).optional(),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutStudentsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  chapters: z.lazy(() => ChapterUncheckedCreateNestedManyWithoutCourseInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseCreateOrConnectWithoutStudentsInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutStudentsInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema) ]),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CourseUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CourseUpdateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CourseUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CourseUpdateWithoutOwnerInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const CourseUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => CourseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CourseUpdateManyMutationInputSchema),z.lazy(() => CourseUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const CourseScalarWhereInputSchema: z.ZodType<Prisma.CourseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CourseScalarWhereInputSchema),z.lazy(() => CourseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseScalarWhereInputSchema),z.lazy(() => CourseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => EnumCourseTagNullableListFilterSchema).optional(),
  coverImage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CourseUpsertWithWhereUniqueWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUpsertWithWhereUniqueWithoutStudentsInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CourseUpdateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutStudentsInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedCreateWithoutStudentsInputSchema) ]),
}).strict();

export const CourseUpdateWithWhereUniqueWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUpdateWithWhereUniqueWithoutStudentsInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CourseUpdateWithoutStudentsInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutStudentsInputSchema) ]),
}).strict();

export const CourseUpdateManyWithWhereWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUpdateManyWithWhereWithoutStudentsInput> = z.object({
  where: z.lazy(() => CourseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CourseUpdateManyMutationInputSchema),z.lazy(() => CourseUncheckedUpdateManyWithoutStudentsInputSchema) ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserCreateWithoutOwnedCoursesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enrolledCourses: z.lazy(() => CourseCreateNestedManyWithoutStudentsInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOwnedCoursesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutStudentsInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOwnedCoursesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedCoursesInputSchema) ]),
}).strict();

export const UserCreateWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserCreateWithoutEnrolledCoursesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseCreateNestedManyWithoutOwnerInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEnrolledCoursesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEnrolledCoursesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema) ]),
}).strict();

export const ChapterCreateWithoutCourseInputSchema: z.ZodType<Prisma.ChapterCreateWithoutCourseInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutChapterInputSchema).optional()
}).strict();

export const ChapterUncheckedCreateWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUncheckedCreateWithoutCourseInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutChapterInputSchema).optional()
}).strict();

export const ChapterCreateOrConnectWithoutCourseInputSchema: z.ZodType<Prisma.ChapterCreateOrConnectWithoutCourseInput> = z.object({
  where: z.lazy(() => ChapterWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChapterCreateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const ChapterCreateManyCourseInputEnvelopeSchema: z.ZodType<Prisma.ChapterCreateManyCourseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChapterCreateManyCourseInputSchema),z.lazy(() => ChapterCreateManyCourseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProgressCreateWithoutCourseInputSchema: z.ZodType<Prisma.ProgressCreateWithoutCourseInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lesson: z.lazy(() => LessonCreateNestedOneWithoutProgressInputSchema)
}).strict();

export const ProgressUncheckedCreateWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateWithoutCourseInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  lessonId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressCreateOrConnectWithoutCourseInputSchema: z.ZodType<Prisma.ProgressCreateOrConnectWithoutCourseInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgressCreateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const ProgressCreateManyCourseInputEnvelopeSchema: z.ZodType<Prisma.ProgressCreateManyCourseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProgressCreateManyCourseInputSchema),z.lazy(() => ProgressCreateManyCourseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserUpsertWithoutOwnedCoursesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwnedCoursesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutOwnedCoursesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOwnedCoursesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutOwnedCoursesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOwnedCoursesInputSchema) ]),
}).strict();

export const UserUpdateWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserUpdateWithoutOwnedCoursesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enrolledCourses: z.lazy(() => CourseUpdateManyWithoutStudentsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutOwnedCoursesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOwnedCoursesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutStudentsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutEnrolledCoursesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEnrolledCoursesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEnrolledCoursesInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutEnrolledCoursesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutEnrolledCoursesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEnrolledCoursesInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutEnrolledCoursesInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutEnrolledCoursesInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional()
}).strict();

export const ChapterUpsertWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUpsertWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => ChapterWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChapterUpdateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedUpdateWithoutCourseInputSchema) ]),
  create: z.union([ z.lazy(() => ChapterCreateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const ChapterUpdateWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUpdateWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => ChapterWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChapterUpdateWithoutCourseInputSchema),z.lazy(() => ChapterUncheckedUpdateWithoutCourseInputSchema) ]),
}).strict();

export const ChapterUpdateManyWithWhereWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUpdateManyWithWhereWithoutCourseInput> = z.object({
  where: z.lazy(() => ChapterScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChapterUpdateManyMutationInputSchema),z.lazy(() => ChapterUncheckedUpdateManyWithoutCourseInputSchema) ]),
}).strict();

export const ChapterScalarWhereInputSchema: z.ZodType<Prisma.ChapterScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChapterScalarWhereInputSchema),z.lazy(() => ChapterScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChapterScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChapterScalarWhereInputSchema),z.lazy(() => ChapterScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ProgressUpsertWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUpsertWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProgressUpdateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedUpdateWithoutCourseInputSchema) ]),
  create: z.union([ z.lazy(() => ProgressCreateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutCourseInputSchema) ]),
}).strict();

export const ProgressUpdateWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUpdateWithWhereUniqueWithoutCourseInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProgressUpdateWithoutCourseInputSchema),z.lazy(() => ProgressUncheckedUpdateWithoutCourseInputSchema) ]),
}).strict();

export const ProgressUpdateManyWithWhereWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUpdateManyWithWhereWithoutCourseInput> = z.object({
  where: z.lazy(() => ProgressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProgressUpdateManyMutationInputSchema),z.lazy(() => ProgressUncheckedUpdateManyWithoutCourseInputSchema) ]),
}).strict();

export const ProgressScalarWhereInputSchema: z.ZodType<Prisma.ProgressScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lessonId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  courseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CourseCreateWithoutChaptersInputSchema: z.ZodType<Prisma.CourseCreateWithoutChaptersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedCoursesInputSchema),
  students: z.lazy(() => UserCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateWithoutChaptersInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutChaptersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseCreateOrConnectWithoutChaptersInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutChaptersInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedCreateWithoutChaptersInputSchema) ]),
}).strict();

export const LessonCreateWithoutChapterInputSchema: z.ZodType<Prisma.LessonCreateWithoutChapterInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutLessonInputSchema).optional()
}).strict();

export const LessonUncheckedCreateWithoutChapterInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutChapterInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutLessonInputSchema).optional()
}).strict();

export const LessonCreateOrConnectWithoutChapterInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutChapterInput> = z.object({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema) ]),
}).strict();

export const LessonCreateManyChapterInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyChapterInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LessonCreateManyChapterInputSchema),z.lazy(() => LessonCreateManyChapterInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CourseUpsertWithoutChaptersInputSchema: z.ZodType<Prisma.CourseUpsertWithoutChaptersInput> = z.object({
  update: z.union([ z.lazy(() => CourseUpdateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutChaptersInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedCreateWithoutChaptersInputSchema) ]),
  where: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const CourseUpdateToOneWithWhereWithoutChaptersInputSchema: z.ZodType<Prisma.CourseUpdateToOneWithWhereWithoutChaptersInput> = z.object({
  where: z.lazy(() => CourseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CourseUpdateWithoutChaptersInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutChaptersInputSchema) ]),
}).strict();

export const CourseUpdateWithoutChaptersInputSchema: z.ZodType<Prisma.CourseUpdateWithoutChaptersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedCoursesNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateWithoutChaptersInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutChaptersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const LessonUpsertWithWhereUniqueWithoutChapterInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutChapterInput> = z.object({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LessonUpdateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedUpdateWithoutChapterInputSchema) ]),
  create: z.union([ z.lazy(() => LessonCreateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedCreateWithoutChapterInputSchema) ]),
}).strict();

export const LessonUpdateWithWhereUniqueWithoutChapterInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutChapterInput> = z.object({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateWithoutChapterInputSchema),z.lazy(() => LessonUncheckedUpdateWithoutChapterInputSchema) ]),
}).strict();

export const LessonUpdateManyWithWhereWithoutChapterInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutChapterInput> = z.object({
  where: z.lazy(() => LessonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateManyMutationInputSchema),z.lazy(() => LessonUncheckedUpdateManyWithoutChapterInputSchema) ]),
}).strict();

export const LessonScalarWhereInputSchema: z.ZodType<Prisma.LessonScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LessonScalarWhereInputSchema),z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonScalarWhereInputSchema),z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  chapterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChapterCreateWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterCreateWithoutLessonsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  course: z.lazy(() => CourseCreateNestedOneWithoutChaptersInputSchema)
}).strict();

export const ChapterUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterUncheckedCreateWithoutLessonsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional()
}).strict();

export const ChapterCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterCreateOrConnectWithoutLessonsInput> = z.object({
  where: z.lazy(() => ChapterWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChapterCreateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutLessonsInputSchema) ]),
}).strict();

export const ProgressCreateWithoutLessonInputSchema: z.ZodType<Prisma.ProgressCreateWithoutLessonInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  course: z.lazy(() => CourseCreateNestedOneWithoutProgressInputSchema)
}).strict();

export const ProgressUncheckedCreateWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateWithoutLessonInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  courseId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressCreateOrConnectWithoutLessonInputSchema: z.ZodType<Prisma.ProgressCreateOrConnectWithoutLessonInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgressCreateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema) ]),
}).strict();

export const ProgressCreateManyLessonInputEnvelopeSchema: z.ZodType<Prisma.ProgressCreateManyLessonInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProgressCreateManyLessonInputSchema),z.lazy(() => ProgressCreateManyLessonInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChapterUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterUpsertWithoutLessonsInput> = z.object({
  update: z.union([ z.lazy(() => ChapterUpdateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedUpdateWithoutLessonsInputSchema) ]),
  create: z.union([ z.lazy(() => ChapterCreateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedCreateWithoutLessonsInputSchema) ]),
  where: z.lazy(() => ChapterWhereInputSchema).optional()
}).strict();

export const ChapterUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterUpdateToOneWithWhereWithoutLessonsInput> = z.object({
  where: z.lazy(() => ChapterWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ChapterUpdateWithoutLessonsInputSchema),z.lazy(() => ChapterUncheckedUpdateWithoutLessonsInputSchema) ]),
}).strict();

export const ChapterUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterUpdateWithoutLessonsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutChaptersNestedInputSchema).optional()
}).strict();

export const ChapterUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.ChapterUncheckedUpdateWithoutLessonsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUpsertWithWhereUniqueWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUpsertWithWhereUniqueWithoutLessonInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProgressUpdateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedUpdateWithoutLessonInputSchema) ]),
  create: z.union([ z.lazy(() => ProgressCreateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutLessonInputSchema) ]),
}).strict();

export const ProgressUpdateWithWhereUniqueWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUpdateWithWhereUniqueWithoutLessonInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProgressUpdateWithoutLessonInputSchema),z.lazy(() => ProgressUncheckedUpdateWithoutLessonInputSchema) ]),
}).strict();

export const ProgressUpdateManyWithWhereWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUpdateManyWithWhereWithoutLessonInput> = z.object({
  where: z.lazy(() => ProgressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProgressUpdateManyMutationInputSchema),z.lazy(() => ProgressUncheckedUpdateManyWithoutLessonInputSchema) ]),
}).strict();

export const LessonCreateWithoutProgressInputSchema: z.ZodType<Prisma.LessonCreateWithoutProgressInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  chapter: z.lazy(() => ChapterCreateNestedOneWithoutLessonsInputSchema)
}).strict();

export const LessonUncheckedCreateWithoutProgressInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutProgressInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  chapterId: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LessonCreateOrConnectWithoutProgressInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutProgressInput> = z.object({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedCreateWithoutProgressInputSchema) ]),
}).strict();

export const CourseCreateWithoutProgressInputSchema: z.ZodType<Prisma.CourseCreateWithoutProgressInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutOwnedCoursesInputSchema),
  students: z.lazy(() => UserCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  chapters: z.lazy(() => ChapterCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseUncheckedCreateWithoutProgressInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutProgressInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownerId: z.string(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutEnrolledCoursesInputSchema).optional(),
  chapters: z.lazy(() => ChapterUncheckedCreateNestedManyWithoutCourseInputSchema).optional()
}).strict();

export const CourseCreateOrConnectWithoutProgressInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutProgressInput> = z.object({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedCreateWithoutProgressInputSchema) ]),
}).strict();

export const LessonUpsertWithoutProgressInputSchema: z.ZodType<Prisma.LessonUpsertWithoutProgressInput> = z.object({
  update: z.union([ z.lazy(() => LessonUpdateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedUpdateWithoutProgressInputSchema) ]),
  create: z.union([ z.lazy(() => LessonCreateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedCreateWithoutProgressInputSchema) ]),
  where: z.lazy(() => LessonWhereInputSchema).optional()
}).strict();

export const LessonUpdateToOneWithWhereWithoutProgressInputSchema: z.ZodType<Prisma.LessonUpdateToOneWithWhereWithoutProgressInput> = z.object({
  where: z.lazy(() => LessonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LessonUpdateWithoutProgressInputSchema),z.lazy(() => LessonUncheckedUpdateWithoutProgressInputSchema) ]),
}).strict();

export const LessonUpdateWithoutProgressInputSchema: z.ZodType<Prisma.LessonUpdateWithoutProgressInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  chapter: z.lazy(() => ChapterUpdateOneRequiredWithoutLessonsNestedInputSchema).optional()
}).strict();

export const LessonUncheckedUpdateWithoutProgressInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutProgressInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chapterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseUpsertWithoutProgressInputSchema: z.ZodType<Prisma.CourseUpsertWithoutProgressInput> = z.object({
  update: z.union([ z.lazy(() => CourseUpdateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutProgressInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedCreateWithoutProgressInputSchema) ]),
  where: z.lazy(() => CourseWhereInputSchema).optional()
}).strict();

export const CourseUpdateToOneWithWhereWithoutProgressInputSchema: z.ZodType<Prisma.CourseUpdateToOneWithWhereWithoutProgressInput> = z.object({
  where: z.lazy(() => CourseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CourseUpdateWithoutProgressInputSchema),z.lazy(() => CourseUncheckedUpdateWithoutProgressInputSchema) ]),
}).strict();

export const CourseUpdateWithoutProgressInputSchema: z.ZodType<Prisma.CourseUpdateWithoutProgressInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedCoursesNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateWithoutProgressInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutProgressInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseCreateNestedManyWithoutOwnerInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseCreateNestedManyWithoutStudentsInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutStudentsInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUpdateManyWithoutOwnerNestedInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUpdateManyWithoutStudentsNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutStudentsNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseCreateNestedManyWithoutOwnerInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseCreateNestedManyWithoutStudentsInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedCreateNestedManyWithoutStudentsInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUpdateManyWithoutOwnerNestedInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUpdateManyWithoutStudentsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  enrolledCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutStudentsNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CourseCreateManyOwnerInputSchema: z.ZodType<Prisma.CourseCreateManyOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  tags: z.union([ z.lazy(() => CourseCreatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.string().optional().nullable(),
  price: z.number().optional(),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const CourseUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => UserUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUpdateManyWithoutCourseNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutEnrolledCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUncheckedUpdateManyWithoutCourseNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CourseUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUpdateWithoutStudentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutOwnedCoursesNestedInputSchema).optional(),
  chapters: z.lazy(() => ChapterUpdateManyWithoutCourseNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutStudentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chapters: z.lazy(() => ChapterUncheckedUpdateManyWithoutCourseNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutCourseNestedInputSchema).optional()
}).strict();

export const CourseUncheckedUpdateManyWithoutStudentsInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyWithoutStudentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => CourseUpdatetagsInputSchema),z.lazy(() => CourseTagSchema).array() ]).optional(),
  coverImage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChapterCreateManyCourseInputSchema: z.ZodType<Prisma.ChapterCreateManyCourseInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional()
}).strict();

export const ProgressCreateManyCourseInputSchema: z.ZodType<Prisma.ProgressCreateManyCourseInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  lessonId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUpdateWithoutEnrolledCoursesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEnrolledCoursesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
  ownedCourses: z.lazy(() => CourseUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutEnrolledCoursesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutEnrolledCoursesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.lazy(() => RoleSchema).array() ]).optional(),
}).strict();

export const ChapterUpdateWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUpdateWithoutCourseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutChapterNestedInputSchema).optional()
}).strict();

export const ChapterUncheckedUpdateWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUncheckedUpdateWithoutCourseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutChapterNestedInputSchema).optional()
}).strict();

export const ChapterUncheckedUpdateManyWithoutCourseInputSchema: z.ZodType<Prisma.ChapterUncheckedUpdateManyWithoutCourseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUpdateWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUpdateWithoutCourseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lesson: z.lazy(() => LessonUpdateOneRequiredWithoutProgressNestedInputSchema).optional()
}).strict();

export const ProgressUncheckedUpdateWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateWithoutCourseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lessonId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyWithoutCourseInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyWithoutCourseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lessonId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LessonCreateManyChapterInputSchema: z.ZodType<Prisma.LessonCreateManyChapterInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  position: z.number().int(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LessonUpdateWithoutChapterInputSchema: z.ZodType<Prisma.LessonUpdateWithoutChapterInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutLessonNestedInputSchema).optional()
}).strict();

export const LessonUncheckedUpdateWithoutChapterInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutChapterInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutLessonNestedInputSchema).optional()
}).strict();

export const LessonUncheckedUpdateManyWithoutChapterInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutChapterInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFree: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressCreateManyLessonInputSchema: z.ZodType<Prisma.ProgressCreateManyLessonInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  courseId: z.string(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUpdateWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUpdateWithoutLessonInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutProgressNestedInputSchema).optional()
}).strict();

export const ProgressUncheckedUpdateWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateWithoutLessonInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyWithoutLessonInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyWithoutLessonInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  courseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CourseFindFirstArgsSchema: z.ZodType<Prisma.CourseFindFirstArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CourseFindFirstOrThrowArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseFindManyArgsSchema: z.ZodType<Prisma.CourseFindManyArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CourseAggregateArgsSchema: z.ZodType<Prisma.CourseAggregateArgs> = z.object({
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(),CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CourseGroupByArgsSchema: z.ZodType<Prisma.CourseGroupByArgs> = z.object({
  where: CourseWhereInputSchema.optional(),
  orderBy: z.union([ CourseOrderByWithAggregationInputSchema.array(),CourseOrderByWithAggregationInputSchema ]).optional(),
  by: CourseScalarFieldEnumSchema.array(),
  having: CourseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CourseFindUniqueArgsSchema: z.ZodType<Prisma.CourseFindUniqueArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const CourseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CourseFindUniqueOrThrowArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const ChapterFindFirstArgsSchema: z.ZodType<Prisma.ChapterFindFirstArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereInputSchema.optional(),
  orderBy: z.union([ ChapterOrderByWithRelationInputSchema.array(),ChapterOrderByWithRelationInputSchema ]).optional(),
  cursor: ChapterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChapterScalarFieldEnumSchema,ChapterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChapterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChapterFindFirstOrThrowArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereInputSchema.optional(),
  orderBy: z.union([ ChapterOrderByWithRelationInputSchema.array(),ChapterOrderByWithRelationInputSchema ]).optional(),
  cursor: ChapterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChapterScalarFieldEnumSchema,ChapterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChapterFindManyArgsSchema: z.ZodType<Prisma.ChapterFindManyArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereInputSchema.optional(),
  orderBy: z.union([ ChapterOrderByWithRelationInputSchema.array(),ChapterOrderByWithRelationInputSchema ]).optional(),
  cursor: ChapterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChapterScalarFieldEnumSchema,ChapterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChapterAggregateArgsSchema: z.ZodType<Prisma.ChapterAggregateArgs> = z.object({
  where: ChapterWhereInputSchema.optional(),
  orderBy: z.union([ ChapterOrderByWithRelationInputSchema.array(),ChapterOrderByWithRelationInputSchema ]).optional(),
  cursor: ChapterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChapterGroupByArgsSchema: z.ZodType<Prisma.ChapterGroupByArgs> = z.object({
  where: ChapterWhereInputSchema.optional(),
  orderBy: z.union([ ChapterOrderByWithAggregationInputSchema.array(),ChapterOrderByWithAggregationInputSchema ]).optional(),
  by: ChapterScalarFieldEnumSchema.array(),
  having: ChapterScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChapterFindUniqueArgsSchema: z.ZodType<Prisma.ChapterFindUniqueArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereUniqueInputSchema,
}).strict() ;

export const ChapterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChapterFindUniqueOrThrowArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereUniqueInputSchema,
}).strict() ;

export const LessonFindFirstArgsSchema: z.ZodType<Prisma.LessonFindFirstArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereInputSchema.optional(),
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(),LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LessonScalarFieldEnumSchema,LessonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LessonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LessonFindFirstOrThrowArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereInputSchema.optional(),
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(),LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LessonScalarFieldEnumSchema,LessonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LessonFindManyArgsSchema: z.ZodType<Prisma.LessonFindManyArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereInputSchema.optional(),
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(),LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LessonScalarFieldEnumSchema,LessonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LessonAggregateArgsSchema: z.ZodType<Prisma.LessonAggregateArgs> = z.object({
  where: LessonWhereInputSchema.optional(),
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(),LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LessonGroupByArgsSchema: z.ZodType<Prisma.LessonGroupByArgs> = z.object({
  where: LessonWhereInputSchema.optional(),
  orderBy: z.union([ LessonOrderByWithAggregationInputSchema.array(),LessonOrderByWithAggregationInputSchema ]).optional(),
  by: LessonScalarFieldEnumSchema.array(),
  having: LessonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LessonFindUniqueArgsSchema: z.ZodType<Prisma.LessonFindUniqueArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema,
}).strict() ;

export const LessonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LessonFindUniqueOrThrowArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema,
}).strict() ;

export const ProgressFindFirstArgsSchema: z.ZodType<Prisma.ProgressFindFirstArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgressScalarFieldEnumSchema,ProgressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProgressFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProgressFindFirstOrThrowArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgressScalarFieldEnumSchema,ProgressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProgressFindManyArgsSchema: z.ZodType<Prisma.ProgressFindManyArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgressScalarFieldEnumSchema,ProgressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProgressAggregateArgsSchema: z.ZodType<Prisma.ProgressAggregateArgs> = z.object({
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProgressGroupByArgsSchema: z.ZodType<Prisma.ProgressGroupByArgs> = z.object({
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithAggregationInputSchema.array(),ProgressOrderByWithAggregationInputSchema ]).optional(),
  by: ProgressScalarFieldEnumSchema.array(),
  having: ProgressScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProgressFindUniqueArgsSchema: z.ZodType<Prisma.ProgressFindUniqueArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const ProgressFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProgressFindUniqueOrThrowArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithAggregationInputSchema.array(),VerificationOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationScalarFieldEnumSchema.array(),
  having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CourseCreateArgsSchema: z.ZodType<Prisma.CourseCreateArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  data: z.union([ CourseCreateInputSchema,CourseUncheckedCreateInputSchema ]),
}).strict() ;

export const CourseUpsertArgsSchema: z.ZodType<Prisma.CourseUpsertArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
  create: z.union([ CourseCreateInputSchema,CourseUncheckedCreateInputSchema ]),
  update: z.union([ CourseUpdateInputSchema,CourseUncheckedUpdateInputSchema ]),
}).strict() ;

export const CourseCreateManyArgsSchema: z.ZodType<Prisma.CourseCreateManyArgs> = z.object({
  data: z.union([ CourseCreateManyInputSchema,CourseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CourseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CourseCreateManyAndReturnArgs> = z.object({
  data: z.union([ CourseCreateManyInputSchema,CourseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CourseDeleteArgsSchema: z.ZodType<Prisma.CourseDeleteArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const CourseUpdateArgsSchema: z.ZodType<Prisma.CourseUpdateArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  data: z.union([ CourseUpdateInputSchema,CourseUncheckedUpdateInputSchema ]),
  where: CourseWhereUniqueInputSchema,
}).strict() ;

export const CourseUpdateManyArgsSchema: z.ZodType<Prisma.CourseUpdateManyArgs> = z.object({
  data: z.union([ CourseUpdateManyMutationInputSchema,CourseUncheckedUpdateManyInputSchema ]),
  where: CourseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CourseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CourseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CourseUpdateManyMutationInputSchema,CourseUncheckedUpdateManyInputSchema ]),
  where: CourseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CourseDeleteManyArgsSchema: z.ZodType<Prisma.CourseDeleteManyArgs> = z.object({
  where: CourseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChapterCreateArgsSchema: z.ZodType<Prisma.ChapterCreateArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  data: z.union([ ChapterCreateInputSchema,ChapterUncheckedCreateInputSchema ]),
}).strict() ;

export const ChapterUpsertArgsSchema: z.ZodType<Prisma.ChapterUpsertArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereUniqueInputSchema,
  create: z.union([ ChapterCreateInputSchema,ChapterUncheckedCreateInputSchema ]),
  update: z.union([ ChapterUpdateInputSchema,ChapterUncheckedUpdateInputSchema ]),
}).strict() ;

export const ChapterCreateManyArgsSchema: z.ZodType<Prisma.ChapterCreateManyArgs> = z.object({
  data: z.union([ ChapterCreateManyInputSchema,ChapterCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChapterCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ChapterCreateManyAndReturnArgs> = z.object({
  data: z.union([ ChapterCreateManyInputSchema,ChapterCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChapterDeleteArgsSchema: z.ZodType<Prisma.ChapterDeleteArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  where: ChapterWhereUniqueInputSchema,
}).strict() ;

export const ChapterUpdateArgsSchema: z.ZodType<Prisma.ChapterUpdateArgs> = z.object({
  select: ChapterSelectSchema.optional(),
  include: ChapterIncludeSchema.optional(),
  data: z.union([ ChapterUpdateInputSchema,ChapterUncheckedUpdateInputSchema ]),
  where: ChapterWhereUniqueInputSchema,
}).strict() ;

export const ChapterUpdateManyArgsSchema: z.ZodType<Prisma.ChapterUpdateManyArgs> = z.object({
  data: z.union([ ChapterUpdateManyMutationInputSchema,ChapterUncheckedUpdateManyInputSchema ]),
  where: ChapterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChapterUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ChapterUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ChapterUpdateManyMutationInputSchema,ChapterUncheckedUpdateManyInputSchema ]),
  where: ChapterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChapterDeleteManyArgsSchema: z.ZodType<Prisma.ChapterDeleteManyArgs> = z.object({
  where: ChapterWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LessonCreateArgsSchema: z.ZodType<Prisma.LessonCreateArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  data: z.union([ LessonCreateInputSchema,LessonUncheckedCreateInputSchema ]),
}).strict() ;

export const LessonUpsertArgsSchema: z.ZodType<Prisma.LessonUpsertArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema,
  create: z.union([ LessonCreateInputSchema,LessonUncheckedCreateInputSchema ]),
  update: z.union([ LessonUpdateInputSchema,LessonUncheckedUpdateInputSchema ]),
}).strict() ;

export const LessonCreateManyArgsSchema: z.ZodType<Prisma.LessonCreateManyArgs> = z.object({
  data: z.union([ LessonCreateManyInputSchema,LessonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LessonCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LessonCreateManyAndReturnArgs> = z.object({
  data: z.union([ LessonCreateManyInputSchema,LessonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LessonDeleteArgsSchema: z.ZodType<Prisma.LessonDeleteArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema,
}).strict() ;

export const LessonUpdateArgsSchema: z.ZodType<Prisma.LessonUpdateArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  data: z.union([ LessonUpdateInputSchema,LessonUncheckedUpdateInputSchema ]),
  where: LessonWhereUniqueInputSchema,
}).strict() ;

export const LessonUpdateManyArgsSchema: z.ZodType<Prisma.LessonUpdateManyArgs> = z.object({
  data: z.union([ LessonUpdateManyMutationInputSchema,LessonUncheckedUpdateManyInputSchema ]),
  where: LessonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LessonUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LessonUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LessonUpdateManyMutationInputSchema,LessonUncheckedUpdateManyInputSchema ]),
  where: LessonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LessonDeleteManyArgsSchema: z.ZodType<Prisma.LessonDeleteManyArgs> = z.object({
  where: LessonWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProgressCreateArgsSchema: z.ZodType<Prisma.ProgressCreateArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  data: z.union([ ProgressCreateInputSchema,ProgressUncheckedCreateInputSchema ]),
}).strict() ;

export const ProgressUpsertArgsSchema: z.ZodType<Prisma.ProgressUpsertArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
  create: z.union([ ProgressCreateInputSchema,ProgressUncheckedCreateInputSchema ]),
  update: z.union([ ProgressUpdateInputSchema,ProgressUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProgressCreateManyArgsSchema: z.ZodType<Prisma.ProgressCreateManyArgs> = z.object({
  data: z.union([ ProgressCreateManyInputSchema,ProgressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProgressCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProgressCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProgressCreateManyInputSchema,ProgressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProgressDeleteArgsSchema: z.ZodType<Prisma.ProgressDeleteArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const ProgressUpdateArgsSchema: z.ZodType<Prisma.ProgressUpdateArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  data: z.union([ ProgressUpdateInputSchema,ProgressUncheckedUpdateInputSchema ]),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const ProgressUpdateManyArgsSchema: z.ZodType<Prisma.ProgressUpdateManyArgs> = z.object({
  data: z.union([ ProgressUpdateManyMutationInputSchema,ProgressUncheckedUpdateManyInputSchema ]),
  where: ProgressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProgressUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProgressUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProgressUpdateManyMutationInputSchema,ProgressUncheckedUpdateManyInputSchema ]),
  where: ProgressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProgressDeleteManyArgsSchema: z.ZodType<Prisma.ProgressDeleteManyArgs> = z.object({
  where: ProgressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
  create: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
  update: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;