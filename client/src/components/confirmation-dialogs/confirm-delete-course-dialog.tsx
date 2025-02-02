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
import { deleteCourse } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ConfirmDeleteCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseTitle: string;
}

export function ConfirmDeleteCourseDialog({
  open,
  onOpenChange,
  courseId,
  courseTitle,
}: ConfirmDeleteCourseDialogProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [confirmCourseTitle, setConfirmCourseTitle] = useState("");

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
  });

  const handleDeleteCourse = () => {
    deleteMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        onOpenChange(false);

        toast.success("Course deleted successfully");
        navigate({ to: "/creator/dashboard" });
      },
      onError: (error) => {
        toast.error("Failed to delete course");
        console.error(error);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete course "{courseTitle}"</AlertDialogTitle>
          <AlertDialogDescription>
            This deletes the course and{" "}
            <span className="underline">all of its chapters and lessons</span>.
            Are you sure you want to do this? This action cannot be undone.
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
              onClick={handleDeleteCourse}
              disabled={
                deleteMutation.isPending || confirmCourseTitle !== courseTitle
              }
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
