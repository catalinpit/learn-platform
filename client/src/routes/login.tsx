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

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={handleSignInWithGitHub}>Sign in</Button>
    </div>
  );
}
