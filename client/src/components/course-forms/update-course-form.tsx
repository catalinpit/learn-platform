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
import {
  TCreateCourseType,
  TUpdateCourseType,
  ZCreateCourseSchema,
} from "@server/shared/types";
import { TagsCombobox } from "@/components/ui/combobox";

type UpdateCourseFormProps = {
  onSubmit: (values: TUpdateCourseType) => void;
  defaultValues: Partial<TUpdateCourseType>;
  setShowUpdateCourseForm: (show: boolean) => void;
};

export function UpdateCourseForm({
  onSubmit,
  defaultValues,
  setShowUpdateCourseForm,
}: UpdateCourseFormProps) {
  const form = useForm<TCreateCourseType>({
    resolver: zodResolver(ZCreateCourseSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      coverImage: defaultValues?.coverImage ?? "",
      tags: defaultValues?.tags ?? [],
      price: defaultValues?.price ?? 0,
      isPublished: defaultValues?.isPublished ?? false,
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 border-border p-4 border rounded-md">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormDescription>
                    Give your course a clear and descriptive title
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter course title..." {...field} />
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
                    Provide a detailed overview of what students will learn in
                    this course
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
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormDescription>
                    Provide a URL for the course cover image
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Enter cover image URL..." {...field} />
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
                    Add relevant tags to help students find your course
                  </FormDescription>
                  <FormControl>
                    <TagsCombobox
                      onChange={field.onChange}
                      value={field.value}
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

            <div className="flex flex-col sm:items-center space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
              <Button type="submit">Update Course</Button>
              <Button
                type="button"
                onClick={() => {
                  setShowUpdateCourseForm(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
