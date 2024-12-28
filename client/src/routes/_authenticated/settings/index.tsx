import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const user = useRouteContext({ from: "/_authenticated" });

  return (
    <>
      <div>Hello settings! {user.name}</div>

      <Suspense fallback={<SkeletonLoader />}>
        <UserProfileForm />
      </Suspense>
    </>
  );
}
