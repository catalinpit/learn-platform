import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getCreatorCourseByIdOptions, unpublishCourse } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ConfirmUnpublishCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseTitle: string;
}

export function ConfirmUnpublishCourseDialog({
  open,
  onOpenChange,
  courseId,
  courseTitle,
}: ConfirmUnpublishCourseDialogProps) {
  const queryClient = useQueryClient();
  const [confirmCourseTitle, setConfirmCourseTitle] = useState("");

  const unpublishMutation = useMutation({
    mutationFn: unpublishCourse,
  });

  const handleUnpublishCourse = () => {
    unpublishMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });
        onOpenChange(false);

        toast.success("Course unpublished successfully");
      },
      onError: (error) => {
        toast.error("Failed to unpublish course");
        console.error(error);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unpublish course "{courseTitle}"</AlertDialogTitle>
          <AlertDialogDescription>
            This will make your course private and no longer accessible to
            users. Current enrolled users will lose access to the course.
            <br />
            <br />
            <span>Type the course title to confirm - "{courseTitle}"</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder="Confirm course title"
          value={confirmCourseTitle}
          onChange={(e) => setConfirmCourseTitle(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleUnpublishCourse}
              disabled={
                unpublishMutation.isPending ||
                confirmCourseTitle !== courseTitle
              }
            >
              {unpublishMutation.isPending ? "Unpublishing..." : "Unpublish"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
