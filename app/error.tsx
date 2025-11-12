"use client";

import { useEffect } from "react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Something went wrong
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          We couldn&apos;t load the dashboard
        </h1>
        <p className="max-w-md text-slate-600">
          Please try again or jump back to the project list. If the issue
          persists, refresh or contact the workspace owner for help.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            Try again
          </button>
          <Link
            href="/projects"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            Go to /projects
          </Link>
        </div>
      </body>
    </html>
  );
}
