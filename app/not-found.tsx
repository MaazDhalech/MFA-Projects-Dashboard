import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
        404
      </p>
      <h1 className="text-3xl font-bold text-slate-900">
        We couldn&apos;t find that project
      </h1>
      <p className="text-slate-600">
        Double-check the URL or pick another project from the dashboard view.
      </p>
      <Link
        href="/projects"
        className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
      >
        Back to projects
      </Link>
    </main>
  );
}
