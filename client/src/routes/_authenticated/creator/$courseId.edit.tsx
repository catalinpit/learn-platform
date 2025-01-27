import {
  getCourseByIdQueryOptions,
  createCourseChapter,
  createChapterLesson,
  deleteCourseChapter,
} from "@/lib/api";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChapterForm } from "@/components/chapter-form";
import { LessonForm } from "@/components/lesson-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TCreateChapterType, TCreateLessonType } from "@server/shared/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/creator/$courseId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCourseByIdQueryOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  const { queryClient } = Route.useRouteContext();
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null
  );
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const { data: course } = useSuspenseQuery(
    getCourseByIdQueryOptions(courseId)
  );

  const addChapterMutation = useMutation({
    mutationFn: (values: TCreateChapterType) => {
      return createCourseChapter(courseId, values);
    },
  });

  const addLessonMutation = useMutation({
    mutationFn: (values: TCreateLessonType) => {
      if (!selectedChapterId) {
        throw new Error("Chapter ID is required");
      }

      return createChapterLesson(courseId, selectedChapterId, values);
    },
  });

  const deleteChapterMutation = useMutation({
    mutationFn: (chapterId: string) => {
      return deleteCourseChapter(courseId, chapterId);
    },
  });

  if ("message" in course) {
    return <div>Error: {course.message}</div>;
  }

  const handleChapterSubmit = (values: TCreateChapterType) => {
    addChapterMutation.mutate(values, {
      onSuccess: () => {
        setShowChapterForm(false);
        queryClient.invalidateQueries({
          queryKey: getCourseByIdQueryOptions(courseId).queryKey,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleLessonSubmit = (values: TCreateLessonType) => {
    if (!selectedChapterId) {
      return;
    }

    addLessonMutation.mutate(values, {
      onSuccess: () => {
        setShowLessonForm(false);
        setSelectedChapterId(null);
        queryClient.invalidateQueries({
          queryKey: getCourseByIdQueryOptions(courseId).queryKey,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleDeleteChapter = (chapterId: string) => {
    deleteChapterMutation.mutate(chapterId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCourseByIdQueryOptions(courseId).queryKey,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleLessonClick = (lessonId: string, isFree: boolean) => {
    if (!isFree) {
      return;
    }

    setExpandedLessonId(expandedLessonId === lessonId ? null : lessonId);
  };

  return (
    <>
      {!course.isPublished ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 mx-auto w-2/3 rounded-lg">
          This course is not published yet. Only you can see it.
        </div>
      ) : null}

      <Card className="mx-8 my-8">
        <img
          src={course.coverImage || undefined}
          alt={course.title}
          className="w-full object-cover h-64 rounded-t-xl"
        />

        <CardHeader>
          <CardTitle className="text-5xl py-4 font-base">
            {course.title}
          </CardTitle>
          <CardDescription>
            <div className="prose dark:prose-headings:text-white dark:text-white">
              {/* TODO: FIX THIS ASAP */}
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 rounded-full text-sm dark:bg-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mx-8">
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => {
              setShowChapterForm(true);
              setShowLessonForm(false);
            }}
          >
            Add Chapter
          </Button>
        </div>

        {showChapterForm && (
          <ChapterForm
            onSubmit={handleChapterSubmit}
            setShowChapterForm={setShowChapterForm}
          />
        )}
        {showLessonForm && <LessonForm onSubmit={handleLessonSubmit} />}

        <div className="my-8 space-y-6">
          {course.chapters.map((chapter) => (
            <Card key={chapter.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {chapter.title}
                    {chapter.isFree && (
                      <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedChapterId(chapter.id);
                        setShowLessonForm(true);
                        setShowChapterForm(false);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Add Lesson
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteChapter(chapter.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  <div className="prose dark:prose-headings:text-white dark:text-white">
                    {/* TODO: FIX THIS ASAP */}
                    <div
                      dangerouslySetInnerHTML={{ __html: chapter.description }}
                    />
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() =>
                        handleLessonClick(lesson.id, lesson.isFree)
                      }
                      className={cn(
                        "flex flex-col p-4 rounded-lg border bg-card transition-colors",
                        lesson.isFree
                          ? "cursor-pointer hover:bg-accent"
                          : "cursor-not-allowed opacity-75"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{lesson.title}</span>
                          {lesson.isFree && (
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                              Free
                            </span>
                          )}
                        </div>
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                      {lesson.isFree && expandedLessonId === lesson.id && (
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                          {/* TODO: FIX THIS ASAP */}
                          <div
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
