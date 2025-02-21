import { Button } from "@/components/ui/button";
import {
  getCreatorCourseByIdOptions,
  createCourseChapter,
  createChapterLesson,
  updateCourseChapter,
  updateCourseLesson,
  updateCourse,
} from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
import { UpdateCourseForm } from "@/components/course-forms/update-course-form";
import { useState, useRef, useEffect } from "react";
import {
  TCreateChapterType,
  TCreateLessonType,
  TUpdateChapterType,
  TUpdateLessonType,
  TUpdateCourseType,
} from "@server/shared/types";
import { toast } from "sonner";
import { CourseChapterList } from "@/components/course-chapters/course-chapter-list";
import { ConfirmDeleteCourseDialog } from "@/components/confirmation-dialogs/confirm-delete-course-dialog";
import { ConfirmPublishCourseDialog } from "@/components/confirmation-dialogs/confirm-publish-course-dialog";
import { ConfirmUnpublishCourseDialog } from "@/components/confirmation-dialogs/confirm-unpublish-course-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { InfoCard } from "@/components/ui/info-card";
import { courseTagToString } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/creator/$courseId/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      getCreatorCourseByIdOptions(params.courseId)
    );
  },
});

function RouteComponent() {
  const course = Route.useLoaderData();
  const { courseId } = Route.useParams();
  const { queryClient } = Route.useRouteContext();

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
  const [showPublishCourseDialog, setShowPublishCourseDialog] = useState(false);
  const [showUnpublishCourseDialog, setShowUnpublishCourseDialog] =
    useState(false);
  const [showUpdateCourseForm, setShowUpdateCourseForm] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      showChapterForm ||
      chapterToEdit ||
      showLessonForm ||
      lessonToEdit ||
      showUpdateCourseForm
    ) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [
    showChapterForm,
    chapterToEdit,
    showLessonForm,
    lessonToEdit,
    showUpdateCourseForm,
  ]);

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

  const updateCourseMutation = useMutation({
    mutationFn: (values: TUpdateCourseType) => {
      return updateCourse(courseId, values);
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

  const handleUpdateCourse = async (values: TUpdateCourseType) => {
    updateCourseMutation.mutate(values, {
      onSuccess: () => {
        setShowUpdateCourseForm(false);
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Course has been updated successfully.");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handlePublishCourse = () => {
    setShowPublishCourseDialog(true);
  };

  const handleUnpublishCourse = () => {
    setShowUnpublishCourseDialog(true);
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

  const isUpdatePending =
    updateCourseMutation.isPending ||
    updateChapterMutation.isPending ||
    updateCourseLessonMutation.isPending;

  const requiredChaptersAndLessons =
    course.chapters.length > 0 &&
    course.chapters.some((chapter) => chapter.lessons.length > 0);

  const tags = course.tags.map((tag) => courseTagToString(tag));

  return (
    <>
      {!course.isPublished && (
        <InfoCard
          className="mx-8 mb-8"
          title="Draft Mode - Only visible to you"
        />
      )}

      {isUpdatePending ? (
        <LoadingSpinner fullScreen text="Updating course..." />
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
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => {
                setShowUpdateCourseForm(true);
                setShowChapterForm(false);
                setChapterToEdit(null);
                setShowLessonForm(false);
                setLessonToEdit(null);
              }}
              variant="outline"
              size="sm"
            >
              Edit Course
            </Button>
            <Button
              onClick={() => setShowDeleteCourseDialog(true)}
              variant="destructive"
              size="sm"
            >
              Delete Course
            </Button>
          </div>
          <CardDescription>
            <div className="prose dark:prose-headings:text-white dark:text-white dark:prose-strong:text-white">
              {/* TODO: FIX THIS ASAP */}
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
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
              onClick={
                course.isPublished ? handleUnpublishCourse : handlePublishCourse
              }
              variant={course.isPublished ? "destructive" : "default"}
              size="sm"
              disabled={!requiredChaptersAndLessons || isUpdatePending}
            >
              {course.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
              onClick={() => {
                setShowChapterForm(true);
                setShowLessonForm(false);
                setChapterToEdit(null);
                setLessonToEdit(null);
                setShowUpdateCourseForm(false);
              }}
              size="sm"
            >
              Add Chapter
            </Button>
          </div>
        </CardContent>
      </Card>

      {!requiredChaptersAndLessons && (
        <InfoCard
          className="mx-8 mb-8"
          title="Almost Ready to Publish!"
          description={
            <>
              <p className="mb-2">
                Your course is looking great! To make it available to students,
                you'll need:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least one chapter to organize your content</li>
                <li>At least one lesson with educational material</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                💡 Tip: Use chapters to group related lessons together. This
                helps students navigate through your course more effectively.
              </p>
            </>
          }
        />
      )}

      <div className="mx-8" ref={formRef}>
        {showUpdateCourseForm && (
          <UpdateCourseForm
            onSubmit={handleUpdateCourse}
            setShowUpdateCourseForm={setShowUpdateCourseForm}
            defaultValues={{
              title: course.title,
              description: course.description,
              coverImage: course.coverImage ?? undefined,
              tags: course.tags,
              price: course.price,
              isPublished: course.isPublished,
            }}
          />
        )}

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
            setShowUpdateCourseForm(false);
          }}
          onEditChapter={(chapterId: string) => {
            setChapterToEdit(chapterId);
            setShowChapterForm(false);
            setShowLessonForm(false);
            setLessonToEdit(null);
            setShowUpdateCourseForm(false);
          }}
          onEditLesson={(lessonId: string, chapterId: string) => {
            setChapterToEdit(null);
            setLessonChapterId(chapterId);
            setShowChapterForm(false);
            setShowLessonForm(false);
            setLessonToEdit(lessonId);
            setShowUpdateCourseForm(false);
          }}
        />
      </div>

      <ConfirmDeleteCourseDialog
        open={showDeleteCourseDialog}
        onOpenChange={setShowDeleteCourseDialog}
        courseId={courseId}
        courseTitle={course.title}
      />

      <ConfirmPublishCourseDialog
        open={showPublishCourseDialog}
        onOpenChange={setShowPublishCourseDialog}
        courseId={courseId}
        courseTitle={course.title}
        disabled={!requiredChaptersAndLessons}
      />

      <ConfirmUnpublishCourseDialog
        open={showUnpublishCourseDialog}
        onOpenChange={setShowUnpublishCourseDialog}
        courseId={courseId}
        courseTitle={course.title}
      />
    </>
  );
}
