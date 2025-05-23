import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/tip-tap";
import { Switch } from "@/components/ui/switch";
import { TCreateLessonType, ZCreateLessonSchema } from "@server/shared/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UpdateLessonFormProps = {
  onSubmit: (values: TCreateLessonType) => void;
  defaultValues?: Partial<TCreateLessonType>;
  setShowUpdateLessonForm: (show: boolean) => void;
};

export function UpdateLessonForm({
  onSubmit,
  defaultValues,
  setShowUpdateLessonForm,
}: UpdateLessonFormProps) {
  const form = useForm<TCreateLessonType>({
    resolver: zodResolver(ZCreateLessonSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      isPublished: defaultValues?.isPublished ?? false,
      isFree: defaultValues?.isFree ?? false,
    },
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Update Lesson</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormDescription>
                    Give your lesson a clear and descriptive title
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter lesson title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormDescription>
                    Write your lesson content using the rich text editor
                  </FormDescription>
                  <FormControl>
                    <Tiptap
                      onChange={field.onChange}
                      initialValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                      <FormDescription>
                        Make this lesson available to students
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel>Free Preview</FormLabel>
                      <FormDescription>
                        Allow free access to this lesson
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:items-center space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
            <Button type="submit" className="w-full sm:w-auto">
              Update Lesson
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowUpdateLessonForm(false)}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
