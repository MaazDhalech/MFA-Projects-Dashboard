const skeletons = Array.from({ length: 6 });

export default function ProjectsLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:py-12">
      <div className="space-y-4">
        <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="h-8 w-64 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-3xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    </main>
  );
}
