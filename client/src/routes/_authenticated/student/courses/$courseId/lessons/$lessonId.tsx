import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getStudentCourseByIdOptions, completeLesson } from "@/lib/api";
import { CourseNavigation } from "@/components/course-sidebar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  calculateCourseProgress,
  convertDatesToDateObjects,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { TCompleteLessonType } from "@server/shared/types";

export const Route = createFileRoute(
  "/_authenticated/student/courses/$courseId/lessons/$lessonId"
)({
  component: RouteComponent,
  loader: ({ params, context }) => {
    return context.queryClient.ensureQueryData(
      getStudentCourseByIdOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const { courseId, lessonId } = Route.useParams();
  const { data } = useSuspenseQuery(getStudentCourseByIdOptions(courseId));
  const { queryClient } = Route.useRouteContext();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const course = convertDatesToDateObjects(data);

  const completeLessonMutation = useMutation({
    mutationFn: ({ lessonId }: TCompleteLessonType) => {
      if (!courseId || !lessonId) {
        throw new Error("Missing course id or lesson id");
      }

      return completeLesson(courseId, lessonId);
    },
  });

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

  const markLessonAsComplete = () => {
    completeLessonMutation.mutate(
      { lessonId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getStudentCourseByIdOptions(courseId).queryKey,
            exact: true,
          });

          toast.success("Lesson has been marked as complete");
        },
        onError: (error) => {
          toast.error("Failed to complete lesson");
          console.error(error);
        },
      }
    );
  };

  const handleNextLesson = () => {
    const allLessons =
      course.chapters?.flatMap((chapter) => chapter.lessons) ?? [];
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson?.id === lessonId
    );
    const nextLesson = allLessons[currentIndex + 1];

    if (!nextLesson) {
      return;
    }

    navigate({
      to: "/student/courses/$courseId/lessons/$lessonId",
      params: { courseId, lessonId: nextLesson.id },
    });
  };

  const handlePreviousLesson = () => {
    const allLessons =
      course.chapters?.flatMap((chapter) => chapter.lessons) ?? [];
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson?.id === lessonId
    );
    const previousLesson = allLessons[currentIndex - 1];

    if (!previousLesson) {
      return;
    }

    navigate({
      to: "/student/courses/$courseId/lessons/$lessonId",
      params: { courseId, lessonId: previousLesson.id },
    });
  };

  return (
    <SidebarProvider>
      {isMobile && (
        <div className="fixed top-24 left-4 flex items-center gap-2">
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
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl space-y-8 p-6 md:p-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground max-w-full overflow-hidden">
            <span className="font-medium text-foreground truncate max-w-[120px] sm:max-w-[200px]">
              <Link to="/student/courses/$courseId" params={{ courseId }}>
                {course.title}
              </Link>
            </span>
            <span className="flex-shrink-0">/</span>
            {currentLesson && (
              <>
                <span className="truncate max-w-[100px] sm:max-w-[150px]">
                  {
                    course.chapters?.find((chapter) =>
                      chapter.lessons?.some((lesson) => lesson.id === lessonId)
                    )?.title
                  }
                </span>
                <span className="flex-shrink-0">/</span>
                <span className="truncate max-w-[100px] sm:max-w-[150px]">
                  {currentLesson.title}
                </span>
              </>
            )}
          </nav>

          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold">
                    {currentLesson?.title}
                  </CardTitle>
                  {isCompleted && (
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                  )}
                </div>
                {!isCompleted && (
                  <Button
                    variant="default"
                    size="default"
                    className="gap-2 transition-all hover:shadow-md max-w-2xl"
                    onClick={markLessonAsComplete}
                    disabled={completeLessonMutation.isPending}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {completeLessonMutation.isPending
                      ? "Marking as Complete..."
                      : "Mark as Complete"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none pb-8">
              {currentLesson?.content}
            </CardContent>
          </Card>

          <Card className="bg-muted/50 shadow-md">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold sm:text-lg">
                      Course Progress
                    </h2>
                  </div>
                  <span className="text-base sm:text-2xl font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2 w-full bg-muted" />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePreviousLesson}
              className="text-sm"
            >
              <span className="hidden sm:inline">← Previous Lesson</span>
              <span className="sm:hidden">← Previous</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleNextLesson}
              className="text-sm"
            >
              <span className="hidden sm:inline">Next Lesson →</span>
              <span className="sm:hidden">Next →</span>
            </Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
