
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { UpdateItem } from "@/components/UpdateItem";
import { getProjectById, listUpdates } from "@/data/projects";
import { formatTimeAgo } from "@/lib/time";

export const revalidate = 60;

type Params = { id: string };

// Next 16: params is a Promise in RSCs
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Projects · Project Dashboard",
      description: "Project not found",
    };
  }

  return {
    title: `${project.title} · Project Dashboard`,
    description: `${project.type} initiative in ${project.country}`,
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const updates = await listUpdates(project.id);
  const lastUpdate = formatTimeAgo(project.lastUpdateAt ?? null);
  const percent = Number(project.percentComplete ?? 0);
  const percentLabel = percent.toFixed(2);
  const placeholderSteps = [
    "Confirm logistics handoff with local partners.",
    "Publish the next milestone update for field teams.",
    "Review budget alignment before the next sprint review.",
  ];

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
      >
        ← Back to projects
      </Link>

      <header className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {project.owner && (
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Owner • {project.owner}
              </p>
            )}
            <h1 className="text-3xl font-bold text-slate-900">
              {project.title}
            </h1>
            <p className="text-sm text-slate-500">
              {project.type} · {project.country}
            </p>
          </div>
          <dl className="text-right text-sm text-slate-500">
            <dt>Status</dt>
            <dd className="text-lg font-semibold text-slate-900">
              {project.status.toUpperCase()}
            </dd>
            {lastUpdate && (
              <dd title={lastUpdate.iso}>Updated {lastUpdate.label}</dd>
            )}
          </dl>
        </div>
        <div className="text-sm text-slate-600">
          <p>
            Created{" "}
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString()
              : "—"}
          </p>
          <p>
            Last updated{" "}
            {project.updatedAt
              ? new Date(project.updatedAt).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              Overall progress
            </p>
            <p className="text-sm text-slate-500">
              {percentLabel}%
            </p>
          </div>
          <ProgressBar value={percent} />
          <p className="text-sm text-slate-500">
            Based on completed milestones logged for this initiative.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-700">Next steps</p>
          <p className="mt-2 text-sm text-slate-500">
            Use this panel for quick checklists, owner assignments, or blocking
            issues. Placeholder tasks below show how it renders.
          </p>
          <ul className="mt-4 list-inside list-disc text-sm text-slate-600">
            {placeholderSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Latest activity
          </h2>
          <p className="text-sm text-slate-500">
            Entries are displayed in reverse chronological order.
          </p>
        </div>
        {updates.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No updates have been published for this project yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {updates.map((update) => (
              <UpdateItem key={update.id} update={update} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
