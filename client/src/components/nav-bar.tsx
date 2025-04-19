import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { MenuSwitcher } from "@/components/menu-switcher";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export function NavBar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 py-4 mb-4">
      <nav className="max-w-4xl mx-auto rounded-lg bg-neutral-50 border border-neutral-200 dark:bg-[#121212] dark:border-neutral-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            search={{ search: "", page: 1, perPage: 10 }}
            className="flex items-center gap-2"
          >
            <svg
              className="w-6 h-6 text-neutral-900 dark:text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              Learn Course
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {!session ? (
              <>
                <Link
                  to="/login"
                  className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
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
        </div>
      </nav>

      <div className={cn("md:hidden", !isMobileMenuOpen && "hidden")}>
        <div className="mt-2 px-2 pt-2 pb-3 space-y-1 rounded-lg bg-neutral-50 border border-neutral-200 dark:bg-[#121212] dark:border-neutral-800">
          {!session ? (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex justify-center pt-2">
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
