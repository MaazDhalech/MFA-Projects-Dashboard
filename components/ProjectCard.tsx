import Link from "next/link";
import { Project } from "@/types/project";
import { ProgressBar } from "./ProgressBar";
import { formatTimeAgo } from "@/lib/time";

interface ProjectCardProps {
  project: Project;
}

const statusCopy: Record<
  Project["status"],
  { label: string; color: string; dot: string }
> = {
  planned: {
    label: "Planned",
    color: "bg-slate-100 text-slate-700",
    dot: "bg-slate-400",
  },
  active: {
    label: "Active",
    color: "bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
  },
  blocked: {
    label: "Blocked",
    color: "bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
  },
  done: {
    label: "Complete",
    color: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusCopy[project.status];
  const lastUpdate = formatTimeAgo(project.lastUpdateAt ?? null);
  const percent = Number(project.percentComplete ?? 0);
  const percentLabel = percent.toFixed(2);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
      aria-label={`View details for ${project.title}`}
    >
      <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
        <div className="space-y-4">
          <div className="flex h-40 w-full items-center justify-between rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 px-5 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                {project.country}
              </p>
              <p className="text-xl font-semibold">{project.type}</p>
            </div>
            <p className="text-4xl font-bold">
              {percentLabel}%
            </p>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              {project.owner && (
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {project.owner}
                </p>
              )}
              <h3 className="text-lg font-semibold text-slate-900">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {project.type ?? "General"} · {project.country ?? "Global"}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}
            >
              <span className={`h-2 w-2 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
          <p className="text-sm text-slate-600">
            {status.label} program in {project.country}.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">
              {percentLabel}% complete
            </span>
            {lastUpdate ? (
              <span title={lastUpdate.iso}>Updated {lastUpdate.label}</span>
            ) : (
              <span aria-label="No recent updates">No recent updates</span>
            )}
          </div>
          <ProgressBar value={percent} />
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <span>
            Created{" "}
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString()
              : "—"}
          </span>
          <span className="font-semibold text-slate-600">
            {project.type.toUpperCase()}
          </span>
        </div>
      </article>
    </Link>
  );
}
