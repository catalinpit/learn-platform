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
import { getCreatorCourseByIdOptions, publishCourse } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type ConfirmPublishCourseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseTitle: string;
  disabled: boolean;
};

export function ConfirmPublishCourseDialog({
  open,
  onOpenChange,
  courseId,
  courseTitle,
  disabled,
}: ConfirmPublishCourseDialogProps) {
  const queryClient = useQueryClient();
  const [confirmCourseTitle, setConfirmCourseTitle] = useState("");

  const publishMutation = useMutation({
    mutationFn: publishCourse,
  });

  const handlePublishCourse = () => {
    publishMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getCreatorCourseByIdOptions(courseId).queryKey,
        });

        onOpenChange(false);
        toast.success("Course published successfully");
      },
      onError: (error) => {
        toast.error("Failed to publish course");
        console.error(error);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish course "{courseTitle}"</AlertDialogTitle>
          <AlertDialogDescription>
            This will make your course publicly available to all users. Make
            sure all your content is ready.
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
          <AlertDialogAction variant="default" asChild>
            <Button
              size="sm"
              onClick={handlePublishCourse}
              disabled={
                publishMutation.isPending ||
                confirmCourseTitle !== courseTitle ||
                disabled
              }
            >
              {publishMutation.isPending ? "Publishing..." : "Publish"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
