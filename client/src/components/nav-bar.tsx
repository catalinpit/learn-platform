import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Role } from "@server/shared/types";

import { MenuSwitcher } from "@/components/menu-switcher";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { canCreateCourse } from "@/lib/utils";

export function NavBar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showCreateCourseButton = canCreateCourse(session?.user?.roles ?? []);

  const commonLinks = [{ name: "Home", href: "/" }];
  const studentLinks = [{ name: "My Learning", href: "/student/courses" }];
  const creatorLinks = [
    { name: "Create Course", href: "/creator/new-course" },
    { name: "Creator Dashboard", href: "/creator/dashboard" },
  ];

  const links = [
    ...commonLinks,
    ...(session?.user?.roles?.includes(Role.STUDENT) ? studentLinks : []),
    ...(showCreateCourseButton ? creatorLinks : []),
  ];

  return (
    <nav className="sticky top-0 shadow-sm ring-1 bg-background ring-indigo-100/10 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {session ? (
              <>
                <Link
                  to="/"
                  search={{ search: "", page: 1, perPage: 10 }}
                  className="text-xl font-bold text-foreground md:block hidden"
                >
                  Learn Course
                </Link>
                <div className="md:hidden">
                  <MenuSwitcher />
                </div>
              </>
            ) : (
              <Link
                to="/"
                search={{ search: "", page: 1, perPage: 10 }}
                className="text-xl font-bold"
              >
                Learn Course
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ name, href }) => (
              <Link
                key={href}
                to={href}
                className="text-foreground hover:text-muted-foreground transition-colors"
              >
                {name}
              </Link>
            ))}

            {!session ? (
              <>
                <Link
                  to="/login"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  Register
                </Link>
                <ModeToggle />
              </>
            ) : (
              <>
                <MenuSwitcher />
                <ModeToggle />
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Open mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={cn("md:hidden", !isMobileMenuOpen && "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(({ name, href }) => (
            <Link
              key={href}
              to={href}
              className="block px-3 py-2 text-foreground hover:text-muted-foreground rounded-md text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="hover:bg-slate-800 hover:p-2 rounded-lg">
                {name}
              </span>
            </Link>
          ))}
          {!session ? (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-zinc-300 hover:text-white rounded-md text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="hover:bg-slate-800 hover:p-2 rounded-lg">
                  Login
                </span>
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-zinc-300 hover:text-white rounded-md text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="hover:bg-slate-800 hover:p-2 rounded-lg">
                  Register
                </span>
              </Link>
            </>
          ) : (
            <div className="text-center space-y-2">
              <div className="flex justify-center pt-2">
                <ModeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
