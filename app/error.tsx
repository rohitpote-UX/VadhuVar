"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow text-[var(--accent)] mb-3 block">
        EXPERIENCING AN INTERRUPTION
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-normal mb-4 text-[var(--ink)]">
        Something unexpected occurred.
      </h1>
      <p className="text-[var(--ink-muted)] max-w-[42ch] mb-8 leading-relaxed">
        We encountered a momentary glitch. Please try refreshing the page or
        returning to the salon home.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
