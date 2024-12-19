import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const UserProfileForm = lazy(() =>
  import("@/components/user-profile-form").then((module) => ({
    default: module.UserProfileForm,
  }))
);

export const Route = createFileRoute("/_authenticated/settings/")({
  component: Settings,
});

function Settings() {
  const user = useRouteContext({ from: "/_authenticated" });

  return (
    <>
      <div>Hello settings! {user.name}</div>

      <Suspense fallback={<div>Loading...</div>}>
        <UserProfileForm />
      </Suspense>
    </>
  );
}
