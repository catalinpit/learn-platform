import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import type { TCreateCourseType } from "@server/shared/types";
import { ZCreateCourseSchema } from "@server/shared/types";
import { createCourse } from "@/lib/api";
import Tiptap from "@/components/tip-tap";

export const Route = createFileRoute("/_authenticated/creator/new-course")({
  component: RouteComponent,
  loader: async ({ params, context }) => {},
});

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });

  const form = useForm<TCreateCourseType>({
    resolver: zodResolver(ZCreateCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      price: 0,
      coverImage: "",
    },
  });

  const requiredFields = form.getValues();
  const totalFields = Object.keys(requiredFields).length;
  const completedFields = Object.keys(requiredFields).filter(
    (field) =>
      requiredFields[field] !== "" &&
      requiredFields[field] !== 0 &&
      !(
        Array.isArray(requiredFields[field]) &&
        requiredFields[field].length === 0
      )
  );

  const completionPercentage = Math.round(
    (completedFields.length / totalFields) * 100
  );
  const completedFieldsProgress = `${completedFields.length}/${totalFields}`;

  const onSubmit = async (values: TCreateCourseType) => {
    try {
      const course = await createCourse(values);

      navigate({ to: "/courses/$courseId", params: { courseId: course.id } });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create course");
    }
  };

  const tt = form.watch("description");

  console.log({ tt });

  return (
    <div>
      <h2 className="text-2xl font-medium text-center">New Course Creation</h2>
      <div className="max-w-3xl mx-auto p-6 sm:p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
            <div className="flex flex-col my-8 gap-6 border-border p-4 border rounded-md">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormDescription>
                      This is your public coures name
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter a descriptive name..."
                        {...field}
                      />
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
                      Describe what students will learn
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

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormDescription>
                      Add relevant tags (comma-separated)
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="javascript, react, web development..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormDescription>Set your course price</FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="29.99"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormDescription>
                      URL for the course cover image
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-1/6"
                disabled={
                  completionPercentage < 100 ||
                  completedFields.length < totalFields
                }
              >
                Create Course
              </Button>

              <p className="text-muted-foreground">
                You completed {completionPercentage}% of the course creation
                process. ({completedFieldsProgress} completed)
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
