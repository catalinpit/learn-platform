import { Link, useRouter } from "@tanstack/react-router";

import {
  AvatarWithText,
} from "@/components/ui/avatar";
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

export function MenuSwitcher() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log({ session });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="menu-switcher" className="bg-transparent">
            <AvatarWithText
              avatarSrc={session?.user?.image}
              className="text-foreground"
              avatarFallback={session?.user?.name ?? ""}
              primaryText={session?.user?.name}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
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
                    router.navigate({ to: "/" });
                  },
                },
              });
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
