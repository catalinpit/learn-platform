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
import { InfoCard } from "@/components/ui/info-card";
import { TagsCombobox } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/creator/new-course")({
  component: RouteComponent,
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
  const completedFieldsProgress = `${completedFields.length} fields out of ${totalFields} completed`;

  const onSubmit = async (values: TCreateCourseType) => {
    console.log({ values });
    try {
      const course = await createCourse(values);

      navigate({
        to: "/creator/$courseId/edit",
        params: { courseId: course.id },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create course");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium text-center">New Course Creation</h2>
      <div className="px-6 pt-6">
        <InfoCard
          className={cn(
            "max-w-3xl mx-auto",
            completionPercentage === 100
              ? "border-green-400 bg-green-50/10"
              : "border-yellow-400 bg-yellow-50/10"
          )}
          title={`Course Creation Progress: ${completionPercentage}%`}
          description={completedFieldsProgress}
          variant={completionPercentage === 100 ? "success" : "warning"}
        />
      </div>
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
                      Select relevant tags for your course
                    </FormDescription>
                    <FormControl>
                      <TagsCombobox
                        value={field.value}
                        onChange={field.onChange}
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
                {completionPercentage < 100 ||
                completedFields.length < totalFields
                  ? "Fill all fields"
                  : "Next Step"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
