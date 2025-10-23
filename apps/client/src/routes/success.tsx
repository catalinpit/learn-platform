import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { CheckCircle, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCheckout } from "@/lib/api";

export const Route = createFileRoute("/success")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    checkout_id: String(search.checkout_id),
  }),
  loaderDeps: ({ search: { checkout_id } }) => ({
    checkout_id,
  }),
  loader: async ({ deps: { checkout_id } }) => {
    const checkout = await getCheckout(checkout_id);
    return { checkout };
  },
});

function RouteComponent() {
  const { checkout_id } = Route.useSearch();
  const { checkout } = Route.useLoaderData();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);

    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [showConfetti]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="text-green-500 animate-pulse">
              <CheckCircle size={80} strokeWidth={1.5} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-foreground mb-3">
            Order Confirmed!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your purchase was completed successfully. Thank you for your order!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-muted rounded-lg p-4 text-left">
            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-1">
                Order Reference:
              </p>
              <p className="font-mono text-sm break-all text-foreground">
                {checkout_id}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Course Name:</p>
              <p className="font-mono text-sm break-all text-foreground">
                {checkout.product.name}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button asChild>
            <Link
              to="/student/courses/$courseId"
              params={{
                courseId: String(checkout.product.courseId),
              }}
            >
              Access Course
              <ArrowRight size={18} />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 text-muted-foreground text-sm">
        A confirmation email has been sent to your registered email address.
      </div>
    </div>
  );
}

export default RouteComponent;
