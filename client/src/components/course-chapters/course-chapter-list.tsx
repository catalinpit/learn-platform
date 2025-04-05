import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ConfirmDeleteLessonDialog } from "@/components/confirmation-dialogs/confirm-delete-lesson-dialog";
import { ConfirmDeleteChapterDialog } from "@/components/confirmation-dialogs/confirm-delete-chapter-dialog";
import { Chapter, Lesson } from "@server/prisma/generated/types";

type CourseChapterListProps = {
  chapters: (Chapter & { lessons: Lesson[] })[];
  isEditing?: boolean;
  isOwner?: boolean;
  expandedLessonId: string | null;
  courseId: string;
  onLessonClick?: (lessonId: string, isFree: boolean) => void;
  onAddLesson?: (chapterId: string) => void;
  onEditChapter?: (chapterId: string) => void;
  onEditLesson?: (lessonId: string, chapterId: string) => void;
};

export function CourseChapterList({
  chapters,
  isEditing = false,
  isOwner = false,
  expandedLessonId,
  courseId,
  onLessonClick,
  onAddLesson,
  onEditChapter,
  onEditLesson,
}: CourseChapterListProps) {
  return (
    <div className="my-8 space-y-6">
      {chapters.map((chapter) => (
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
              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => onAddLesson?.(chapter.id)}
                    variant="outline"
                    size="sm"
                  >
                    Add Lesson
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditChapter?.(chapter.id)}
                  >
                    Edit
                  </Button>
                  <ConfirmDeleteChapterDialog
                    courseId={courseId}
                    chapter={chapter}
                  />
                </div>
              )}
            </CardTitle>
            <CardDescription>
              <div className="prose dark:prose-headings:text-white dark:text-white">
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
                    onLessonClick?.(lesson.id, isOwner || lesson.isFree)
                  }
                  className={cn(
                    "flex flex-col p-4 rounded-lg border bg-card transition-colors",
                    isOwner || lesson.isFree
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
                    {isEditing && (
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditLesson?.(lesson.id, chapter.id)}
                        >
                          Edit
                        </Button>
                        <ConfirmDeleteLessonDialog
                          courseId={courseId}
                          chapterId={chapter.id}
                          lesson={lesson}
                        />
                      </div>
                    )}
                  </div>
                  {(isOwner || lesson.isFree) &&
                    expandedLessonId === lesson.id && (
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
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
  );
}
