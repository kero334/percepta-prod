"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Article fetch error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121214] border border-red-500/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icons.FileWarning className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Content unavailable</h2>
        <p className="text-muted-foreground text-sm mb-8">
          We could not load this article. It may have been moved, deleted, or is temporarily unavailable.
        </p>
        <div className="flex flex-col gap-4">
          <Button onClick={reset} className="w-full bg-primary text-black hover:bg-primary/90">
            Try again
          </Button>
          <Link href="/resources">
            <Button variant="outline" className="w-full border-border/50">
              Return to Resources
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
