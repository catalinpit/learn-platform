import { createFileRoute } from "@tanstack/react-router";
import { getStudentCourseByIdOptions } from "@/lib/api";
import { CourseNavigation } from "@/components/course-sidebar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { calculateCourseProgress } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
  "/_authenticated/student/courses/$courseId/lessons/$lessonId"
)({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getStudentCourseByIdOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const { courseId, lessonId } = Route.useParams();
  const course = Route.useLoaderData();
  const isMobile = useIsMobile();

  if (!course) {
    return <LoadingSpinner fullScreen />;
  }

  const currentLesson = course.chapters
    ?.flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson?.id === lessonId);

  const isCompleted = currentLesson?.progress?.some(
    (progress) => progress.completed
  );

  const progress = calculateCourseProgress(course);

  return (
    <SidebarProvider>
      {isMobile && (
        <div className="fixed top-17 left-4 flex items-center gap-2">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Course Content
          </span>
        </div>
      )}
      <CourseNavigation
        course={course}
        courseId={courseId}
        lessonId={lessonId}
      />
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-3xl space-y-6 py-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CardTitle>{currentLesson?.title}</CardTitle>
                {isCompleted && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Completed
                  </Badge>
                )}
              </div>
              <Button
                variant={isCompleted ? "outline" : "default"}
                size="sm"
                className="gap-2"
              >
                <CheckCircle
                  className={`h-4 w-4 ${isCompleted ? "text-green-500" : ""}`}
                />
                {isCompleted ? "Completed" : "Mark Complete"}
              </Button>
            </CardHeader>
            <CardContent>{currentLesson?.content}</CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">Course Progress</h2>
                  <span className="text-sm font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  );
}
