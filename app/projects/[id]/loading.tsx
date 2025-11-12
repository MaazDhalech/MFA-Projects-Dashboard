export default function ProjectDetailLoading() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:py-12">
      <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="grid gap-5 md:grid-cols-[2fr,1fr]">
        <div className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-white" />
        <div className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-white" />
      </div>
      <div className="space-y-3">
        <div className="h-5 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="h-5 w-64 animate-pulse rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-16 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          <div className="h-16 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        </div>
      </div>
    </main>
  );
}
