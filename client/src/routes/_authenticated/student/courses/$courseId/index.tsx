import { createFileRoute, Link } from "@tanstack/react-router";
import { getStudentCourseByIdOptions } from "@/lib/api";
import { CourseSidebar } from "@/components/course-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import NotFound from "@/components/not-found";

export const Route = createFileRoute(
  "/_authenticated/student/courses/$courseId/"
)({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getStudentCourseByIdOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  const course = Route.useLoaderData();
  const isMobile = useIsMobile();

  if (!course) {
    return <NotFound />;
  }

  return (
    <SidebarProvider>
      {isMobile && (
        <div className="fixed top-20 left-4 flex items-center gap-2">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Course Content
          </span>
        </div>
      )}
      <CourseSidebar course={course} courseId={courseId} />

      <main className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-3xl space-y-6 py-8">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-2 text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
          </p>
        </div>
        <Button asChild>
          <Link
            to="/student/courses/$courseId/lessons/$lessonId"
            params={{
              courseId,
              lessonId: course.chapters?.[0]?.lessons?.[0]?.id,
            }}
          >
            Start Learning
          </Link>
        </Button>
      </main>
    </SidebarProvider>
  );
}
