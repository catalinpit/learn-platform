import { Button } from "@/components/ui/button";
import {
  getCreatorCourseByIdOptions,
  createCourseChapter,
  createChapterLesson,
  updateCourseChapter,
  updateCourseLesson,
  deleteCourse,
  publishCourse,
  unpublishCourse,
} from "@/lib/api";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChapterForm } from "@/components/course-forms/chapter-form";
import { UpdateChapterForm } from "@/components/course-forms/update-chapter-form";
import { LessonForm } from "@/components/course-forms/lesson-form";
import { UpdateLessonForm } from "@/components/course-forms/update-lesson-form";
import { useState } from "react";
import {
  TCreateChapterType,
  TCreateLessonType,
  TUpdateChapterType,
  TUpdateLessonType,
} from "@server/shared/types";
import { toast } from "sonner";
import { CourseChapterList } from "@/components/course-chapters/course-chapter-list";
import { ConfirmDeleteCourseDialog } from "@/components/confirmation-dialogs/confirm-delete-course-dialog";

export const Route = createFileRoute("/_authenticated/creator/$courseId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCreatorCourseByIdOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();

  const [showChapterForm, setShowChapterForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null
  );
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [chapterToEdit, setChapterToEdit] = useState<string | null>(null);
  const [lessonToEdit, setLessonToEdit] = useState<string | null>(null);
  const [lessonChapterId, setLessonChapterId] = useState<string | null>(null);
  const [showDeleteCourseDialog, setShowDeleteCourseDialog] = useState(false);

  const { data: course } = useSuspenseQuery(
    getCreatorCourseByIdOptions(courseId)
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

  const updateChapterMutation = useMutation({
    mutationFn: (values: TUpdateChapterType) => {
      if (!chapterToEdit) {
        throw new Error("Chapter ID is required");
      }

      return updateCourseChapter(courseId, chapterToEdit, values);
    },
  });

  const updateCourseLessonMutation = useMutation({
    mutationFn: (values: TUpdateLessonType) => {
      if (!lessonToEdit || !lessonChapterId) {
        throw new Error("Lesson ID is required");
      }

      return updateCourseLesson(
        courseId,
        lessonChapterId,
        lessonToEdit,
        values
      );
    },
  });

  const publishCourseMutation = useMutation({
    mutationFn: (id: string) => {
      return publishCourse(id);
    },
  });

  const unpublishCourseMutation = useMutation({
    mutationFn: (id: string) => {
      return unpublishCourse(id);
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleChapterSubmit = (values: TCreateChapterType) => {
    addChapterMutation.mutate(values, {
      onSuccess: () => {
        setShowChapterForm(false);
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Chapter has been created successfully.");
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
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Lesson has been created successfully.");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleEditChapter = (values: TUpdateChapterType) => {
    updateChapterMutation.mutate(values, {
      onSuccess: () => {
        setChapterToEdit(null);
        setShowChapterForm(false);
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Chapter has been updated successfully.");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleEditLesson = (values: TCreateLessonType) => {
    if (!lessonToEdit) {
      return;
    }

    updateCourseLessonMutation.mutate(values, {
      onSuccess: () => {
        setLessonToEdit(null);
        setShowLessonForm(false);
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Lesson has been updated successfully.");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handlePublishCourse = () => {
    publishCourseMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Course has been published successfully.");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleUnpublishCourse = () => {
    unpublishCourseMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Course has been unpublished successfully.");
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

  const transformedChapters = course.chapters.map((chapter) => ({
    ...chapter,
    createdAt: new Date(chapter.createdAt),
    updatedAt: new Date(chapter.updatedAt),
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      createdAt: new Date(lesson.createdAt),
      updatedAt: new Date(lesson.updatedAt),
    })),
  }));

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
            <div className="prose dark:prose-headings:text-white dark:text-white dark:prose-strong:text-white">
              {/* TODO: FIX THIS ASAP */}
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 rounded-full text-sm dark:bg-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <Button
              onClick={() => navigate({ to: `/creator/${courseId}/update` })}
              variant="outline"
            >
              Edit Course
            </Button>
            <Button
              onClick={
                course.isPublished ? handleUnpublishCourse : handlePublishCourse
              }
              variant="default"
              size="sm"
              disabled={
                publishCourseMutation.isPending ||
                unpublishCourseMutation.isPending
              }
            >
              {course.isPublished ? "Unpublish" : "Publish"} Course
            </Button>
            <Button
              onClick={() => setShowDeleteCourseDialog(true)}
              variant="destructive"
              size="sm"
            >
              Delete Course
            </Button>
            <Button
              onClick={() => {
                setShowChapterForm(true);
                setShowLessonForm(false);
                setChapterToEdit(null);
                setLessonToEdit(null);
              }}
              size="sm"
            >
              Add Chapter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mx-8">
        {showChapterForm && (
          <ChapterForm
            onSubmit={handleChapterSubmit}
            setShowChapterForm={setShowChapterForm}
          />
        )}

        {chapterToEdit && (
          <UpdateChapterForm
            onSubmit={handleEditChapter}
            setShowUpdateChapterForm={() => setChapterToEdit(null)}
            defaultValues={course.chapters.find(
              (chapter) => chapter.id === chapterToEdit
            )}
          />
        )}

        {showLessonForm && (
          <LessonForm
            onSubmit={handleLessonSubmit}
            setShowLessonForm={setShowLessonForm}
          />
        )}

        {lessonToEdit && (
          <UpdateLessonForm
            onSubmit={handleEditLesson}
            setShowUpdateLessonForm={() => {
              setLessonToEdit(null);
              setLessonChapterId(null);
            }}
            defaultValues={course.chapters
              .find((chapter) => chapter.id === lessonChapterId)
              ?.lessons.find((lesson) => lesson.id === lessonToEdit)}
          />
        )}

        <CourseChapterList
          chapters={transformedChapters}
          isEditing={true}
          courseId={courseId}
          expandedLessonId={expandedLessonId}
          onLessonClick={handleLessonClick}
          onAddLesson={(chapterId: string) => {
            setSelectedChapterId(chapterId);
            setShowLessonForm(true);
            setShowChapterForm(false);
            setChapterToEdit(null);
            setLessonToEdit(null);
          }}
          onEditChapter={(chapterId: string) => {
            setChapterToEdit(chapterId);
            setShowChapterForm(false);
            setShowLessonForm(false);
            setLessonToEdit(null);
          }}
          onEditLesson={(lessonId: string, chapterId: string) => {
            setChapterToEdit(null);
            setLessonChapterId(chapterId);
            setShowChapterForm(false);
            setShowLessonForm(false);
            setLessonToEdit(lessonId);
          }}
        />
      </div>

      <ConfirmDeleteCourseDialog
        open={showDeleteCourseDialog}
        onOpenChange={setShowDeleteCourseDialog}
        courseId={courseId}
        courseTitle={course.title}
      />
    </>
  );
}
