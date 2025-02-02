import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oops!
          </h1>
          <p className="text-foreground text-lg">
            We couldn&apos;t find the page you were looking for. Sorry about
            that.
          </p>
        </div>
        <Link
          to="/"
          search={{ search: "", page: 1, perPage: 10 }}
          className="inline-flex h-10 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
