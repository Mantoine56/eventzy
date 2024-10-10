"use client";

import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            {error || "An unknown error occurred during authentication."}
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Button asChild>
            <Link href="/auth/signin">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}