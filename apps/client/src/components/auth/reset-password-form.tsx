import React, { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/lib/auth-client";
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

export function ResetPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/reset-password" });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);

    await resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully");

          setIsLoading(false);
          navigate({ to: "/login" });
        },
        onError: () => {
          toast.error("Failed to reset password. Please try again.");

          setIsLoading(false);
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
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
            >
              {isLoading ? "Resetting..." : "Reset Password"}
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
