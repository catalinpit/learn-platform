import { Link, useRouter } from "@tanstack/react-router";
import { RoleType as Role } from "@server/prisma/generated/types/index";

import { AvatarWithText } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { canCreateCourse } from "@/lib/utils";

export function MenuSwitcher() {
  const router = useRouter();
  const { data: session } = useSession();

  const showCreateCourseButton = canCreateCourse(session?.user?.roles ?? []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const commonLinks = [{ name: "Home", href: "/" }];
  const studentLinks = [{ name: "My Learning", href: "/student/courses" }];
  const creatorLinks = [
    { name: "Create Course", href: "/creator/new-course" },
    { name: "Creator Dashboard", href: "/creator/dashboard" },
  ];

  const links = [
    ...(session?.user?.roles?.includes("STUDENT" as Role) ? studentLinks : []),
    ...(showCreateCourseButton ? creatorLinks : []),
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="menu-switcher"
          className="bg-none ring-0 border-none shadow-none dark:inset-shadow-none hover:scale-105 transition-all duration-100"
        >
          <AvatarWithText
            avatarSrc={session?.user?.image ?? undefined}
            avatarFallback={session?.user?.name ?? ""}
            primaryText={session?.user?.name ?? ""}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        {links.map(({ name, href }) => (
          <DropdownMenuItem key={href} asChild>
            <Link to={href} className="block w-full">
              {name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="block w-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.navigate({
                    to: "/",
                    search: { search: "", page: 1, perPage: 10 },
                  });
                },
              },
            });
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
