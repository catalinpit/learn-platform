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
import { Chapter } from "@server/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseChapter, getCreatorCourseByIdOptions } from "@/lib/api";
import { toast } from "sonner";

type ConfirmDeleteChapterDialogProps = {
  chapter: Chapter;
  courseId: string;
};

export function ConfirmDeleteChapterDialog({
  chapter,
  courseId,
}: ConfirmDeleteChapterDialogProps) {
  const queryClient = useQueryClient();

  const deleteChapterMutation = useMutation({
    mutationFn: (chapterId: string) => {
      return deleteCourseChapter(courseId, chapterId);
    },
  });

  const handleDeleteChapter = () => {
    deleteChapterMutation.mutate(chapter.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        toast.success("Chapter has been deleted successfully.");
      },
      onError: (error) => {
        toast.error("Failed to delete chapter.");
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
          <AlertDialogTitle>Delete "{chapter.title}"</AlertDialogTitle>
          <AlertDialogDescription>
            This deletes the chapter and{" "}
            <span className="underline">all of its lessons</span>. Are you sure
            you want to do this? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteChapter}
              disabled={deleteChapterMutation.isPending}
            >
              {deleteChapterMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
