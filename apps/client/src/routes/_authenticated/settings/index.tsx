import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const UserProfileForm = lazy(() =>
  import("@/components/user-profile-form").then((module) => ({
    default: module.UserProfileForm,
  }))
);

export const Route = createFileRoute("/_authenticated/settings/")({
  component: Settings,
});

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

function Settings() {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
