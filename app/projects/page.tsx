import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { listProjects } from "@/data/projects";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects · Project Dashboard",
  description:
    "Public, read-only project dashboard showing live progress, risk, and recent activity.",
};

function getOptions(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => Boolean(value)))
  ).sort((a, b) => a.localeCompare(b));
}

export default async function ProjectsPage() {
  const projects = await listProjects();
  const typeOptions = getOptions(projects.map((project) => project.type));
  const countryOptions = getOptions(projects.map((project) => project.country));

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Project Dashboard
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              Current initiatives
            </h1>
            <p className="text-slate-600">
              Explore every active initiative, filter by risk or region, and
              drill into the most recent field updates.
            </p>
          </div>
        </div>
      </header>

      <ProjectsBrowser
        projects={projects}
        typeOptions={typeOptions}
        countryOptions={countryOptions}
      />
    </main>
  );
}
