import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

export const Route = createFileRoute("/_authenticated/creator/new-course")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    console.log({ params });
    console.log({ context });
  },
});

function RouteComponent() {
  const form = useForm<TCreateCourseType>({
    resolver: zodResolver(ZCreateCourseSchema),
    defaultValues: {},
  });

  const onSubmit = (values: TCreateCourseType) => {
    console.log(values);
  };

  return <div>Hello "/_authenticated/creator/new-course"!</div>;
}
