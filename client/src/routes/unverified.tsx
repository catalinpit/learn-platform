import { createFileRoute, redirect } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/unverified")({
  component: UnverifiedComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth?.user) {
      throw redirect({
        to: "/",
        search: {
          search: "",
          page: 1,
          perPage: 10,
        },
      });
    }
  },
});

function UnverifiedComponent() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Check Your Email
          </h1>
          <p className="text-foreground text-lg">
            We&apos;ve sent you a verification link. Please check your email to
            verify your account.
          </p>
          <p className="text-muted-foreground text-sm">
            If you don&apos;t see the email, check your spam folder. The
            verification link will expire in 24 hours.
          </p>
        </div>
        <div className="flex gap-4 sm:flex-row justify-center sm:gap-6">
          <Link
            to="/"
            search={{ search: "", page: 1, perPage: 10 }}
            className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-xs sm:text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 sm:px-8"
          >
            Return home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center rounded-md border border-input bg-background px-6 text-xs sm:text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:px-8"
          >
            Refresh page
          </button>
        </div>
      </div>
    </div>
  );
}
