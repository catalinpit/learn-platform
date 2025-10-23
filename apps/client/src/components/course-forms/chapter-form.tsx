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
import { TCreateChapterType, ZCreateChapterSchema } from "@server/shared/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChapterFormProps = {
  onSubmit: (values: TCreateChapterType) => void;
  setShowChapterForm: (show: boolean) => void;
};

export function ChapterForm({
  onSubmit,
  setShowChapterForm,
}: ChapterFormProps) {
  const form = useForm<TCreateChapterType>({
    resolver: zodResolver(ZCreateChapterSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublished: false,
      isFree: false,
    },
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create Chapter</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormDescription>
                    Give your chapter a clear and descriptive title
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter chapter title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    Provide an overview of what this chapter covers
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

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
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
                        Make this chapter available to students
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
                        Allow free access to this chapter
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:items-center space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
            <Button type="submit">Create Chapter</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setShowChapterForm(false);
              }}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
