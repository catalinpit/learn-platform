import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/_authenticated/creator/new-course")({
  component: RouteComponent,
  loader: async ({ params, context }) => {},
});

function RouteComponent() {
  const form = useForm<TCreateCourseType>({
    resolver: zodResolver(ZCreateCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: [],
      price: 0,
      videoUrls: [],
      coverImage: "",
    },
  });

  const onSubmit = async (values: TCreateCourseType) => {
    try {
      await createCourse(values);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create course");
    }
  };

  return (
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
                    <Input placeholder="Course description..." {...field} />
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
                    Detailed course content or syllabus
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Course content..." {...field} />
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
                      value={field.value.join(", ")} // Convert array to string for display
                      onChange={(e) => {
                        // Convert string back to array when updating
                        const tags = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag !== "");
                        field.onChange(tags);
                      }}
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
              name="videoUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URLs</FormLabel>
                  <FormDescription>
                    Add video URLs (one per line)
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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

            <Button type="submit" className="w-1/6">
              Create Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
