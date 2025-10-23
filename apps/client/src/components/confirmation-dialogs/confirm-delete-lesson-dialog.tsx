import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Lesson } from "@server/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseLesson, getCreatorCourseByIdOptions } from "@/lib/api";
import { toast } from "sonner";

type ConfirmDeleteLessonDialogProps = {
  lesson: Lesson;
  courseId: string;
  chapterId: string;
};

export function ConfirmDeleteLessonDialog({
  lesson,
  courseId,
  chapterId,
}: ConfirmDeleteLessonDialogProps) {
  const queryClient = useQueryClient();

  const deleteLessonMutation = useMutation({
    mutationFn: (lessonId: string) => {
      return deleteCourseLesson(courseId, chapterId, lessonId);
    },
  });

  const handleDeleteLesson = () => {
    deleteLessonMutation.mutate(lesson.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Lesson has been deleted successfully.");
      },
      onError: (error) => {
        toast.error("Failed to delete lesson.");
        console.error(error);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{lesson.title}"</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this lesson? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteLesson}
              disabled={deleteLessonMutation.isPending}
            >
              {deleteLessonMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
