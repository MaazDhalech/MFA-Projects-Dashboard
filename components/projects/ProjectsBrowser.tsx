"use client";

import { useEffect, useMemo, useState } from "react";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/types/project";
import { Filters, FiltersBar } from "@/components/FiltersBar";
import { ProjectCard } from "@/components/ProjectCard";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

interface ProjectsBrowserProps {
  projects: Project[];
  typeOptions: string[];
  countryOptions: string[];
}

const defaultFilters: Filters = {
  search: "",
  status: "all",
  type: "all",
  country: "all",
};

function areFiltersEqual(a: Filters, b: Filters) {
  return (
    a.search === b.search &&
    a.status === b.status &&
    a.type === b.type &&
    a.country === b.country
  );
}

const STATUS_VALUES = ["planned", "active", "blocked", "done", "all"] as const;
type StatusFilter = (typeof STATUS_VALUES)[number];

function normalize(v: string | null): string | null {
  return v && v.trim() !== "" ? v : null;
}

function isStatus(v: string | null): v is StatusFilter {
  return !!v && (STATUS_VALUES as readonly string[]).includes(v);
}

function parseFilters(params: URLSearchParams): Filters {
  const searchParam  = normalize(params.get("search"));
  const statusParam  = normalize(params.get("status"));
  const typeParam    = normalize(params.get("type"));
  const countryParam = normalize(params.get("country"));

  return {
    search:  searchParam ?? defaultFilters.search,
    status:  isStatus(statusParam) ? statusParam : defaultFilters.status,
    type:    typeParam ?? defaultFilters.type,
    country: countryParam ?? defaultFilters.country,
  };
}

export function ProjectsBrowser({
  projects,
  typeOptions,
  countryOptions,
}: ProjectsBrowserProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Filters>(() =>
    parseFilters(searchParams)
  );

  useEffect(() => {
    const next = parseFilters(searchParams);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters((current) => (areFiltersEqual(current, next) ? current : next));
  }, [searchParams]);

  const debouncedSearch = useDebouncedValue(filters.search, 300);

  const updateQuery = (next: Filters) => {
    const params = new URLSearchParams(searchParams);
    if (next.search.trim().length > 0) {
      params.set("search", next.search.trim());
    } else {
      params.delete("search");
    }
    if (next.status !== "all") {
      params.set("status", next.status);
    } else {
      params.delete("status");
    }
    if (next.type !== "all") {
      params.set("type", next.type);
    } else {
      params.delete("type");
    }
    if (next.country !== "all") {
      params.set("country", next.country);
    } else {
      params.delete("country");
    }

    const queryString = params.toString();
    const nextRoute = `${pathname}${queryString ? `?${queryString}` : ""}` as Route;
    router.replace(nextRoute, { scroll: false });
  };

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        debouncedSearch.trim().length === 0 ||
        project.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus =
        filters.status === "all" || project.status === filters.status;
      const matchesType =
        filters.type === "all" ||
        (project.type ?? "").toLowerCase() === filters.type.toLowerCase();
      const matchesCountry =
        filters.country === "all" ||
        (project.country ?? "").toLowerCase() ===
          filters.country.toLowerCase();
      return matchesSearch && matchesStatus && matchesType && matchesCountry;
    });
  }, [projects, debouncedSearch, filters.status, filters.type, filters.country]);

  const handleFiltersChange = (next: Filters) => {
    setFilters(next);
    updateQuery(next);
  };

  return (
    <div className="space-y-6">
      <FiltersBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        typeOptions={typeOptions}
        countryOptions={countryOptions}
      />

      <div className="flex items-center justify-between text-sm text-slate-500">
        <p aria-live="polite">
          Showing {visibleProjects.length} of {projects.length} projects
        </p>
        {debouncedSearch && (
          <p title="Search term">Search: “{debouncedSearch}”</p>
        )}
      </div>

      {visibleProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
          No projects match these filters. Try clearing the filters or search
          query.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
