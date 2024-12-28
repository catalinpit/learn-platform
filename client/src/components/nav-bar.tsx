import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { MenuSwitcher } from "@/components/menu-switcher";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { canCreateCourse } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showCreateCourseButton = canCreateCourse(session?.user?.roles ?? []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 shadow-xl ring-1 ring-indigo-100/10 bg-gray-950 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {session ? (
              <>
                <Link
                  to="/"
                  className="text-xl text-background dark:text-foreground font-bold md:block hidden"
                >
                  Learn Course
                </Link>
                <div className="md:hidden">
                  <MenuSwitcher />
                </div>
              </>
            ) : (
              <Link to="/" className="text-xl font-bold">
                Learn Course
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ name, href }) => (
              <Link
                key={href}
                to={href}
                className="text-zinc-300 hover:text-white transition-colors"
              >
                {name}
              </Link>
            ))}

            {!session ? (
              <>
                <Link
                  to="/login"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  Register
                </Link>
                <ModeToggle />
              </>
            ) : (
              <>
                {showCreateCourseButton && (
                  <Button variant="outline">
                    <Link
                      to="/creator/new-course"
                      className="text-zinc-300 hover:text-white transition-colors"
                    >
                      Create Course
                    </Link>
                  </Button>
                )}
                <MenuSwitcher />
                <ModeToggle />
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-300 hover:text-white"
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
              className="block px-3 py-2 text-zinc-300 hover:text-white rounded-md text-center"
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
            showCreateCourseButton && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link
                    to="/creator/new-course"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    Create Course
                  </Link>
                </Button>
              </div>
            )
          )}
          <div className="flex justify-center pt-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
