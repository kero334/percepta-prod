"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export default function ResourcesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Resources feed error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121214] border border-red-500/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icons.AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Failed to load resources</h2>
        <p className="text-muted-foreground text-sm mb-8">
          We encountered an issue while connecting to the database. Please try again.
        </p>
        <div className="flex flex-col gap-4">
          <Button onClick={reset} className="w-full bg-primary text-black hover:bg-primary/90">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
