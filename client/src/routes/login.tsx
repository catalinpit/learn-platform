import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const handleSignInWithGitHub = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  const handleSignInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1>Login</h1>
      <Button className="w-1/6" onClick={handleSignInWithGitHub}>
        Sign in with GitHub
      </Button>
      <Button className="w-1/6" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </Button>
    </div>
  );
}
