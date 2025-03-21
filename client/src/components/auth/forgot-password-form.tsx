import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { forgetPassword } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await forgetPassword(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          toast.success(
            "If an account exists with this email, you will receive a password reset link."
          );

          setLoading(false);
          setEmail("");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again later.");
          setLoading(false);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-6 w-full max-w-lg mx-auto",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        Remember your password?{" "}
        <Button
          variant="link"
          className="h-auto p-0 text-xs font-normal text-foreground underline-offset-4 hover:underline"
          onClick={() => navigate({ to: "/login" })}
        >
          Back to login
        </Button>
      </div>
    </div>
  );
}
