"use client";

import { ProjectStatus } from "@/types/project";

export interface Filters {
  search: string;
  status: ProjectStatus | "all";
  type: string | "all";
  country: string | "all";
}

interface FiltersBarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  typeOptions: string[];
  countryOptions: string[];
}

const statusOptions: Array<{ label: string; value: Filters["status"] }> = [
  { label: "All statuses", value: "all" },
  { label: "Planned", value: "planned" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
  { label: "Done", value: "done" },
];

export function FiltersBar({
  filters,
  onFiltersChange,
  typeOptions,
  countryOptions,
}: FiltersBarProps) {
  const handleChange = <Key extends keyof Filters>(
    key: Key,
    value: Filters[Key]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <section
      aria-label="Project filters"
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="project-search"
          className="text-sm font-semibold text-slate-700"
        >
          Search by title
        </label>
        <input
          id="project-search"
          type="search"
          placeholder="Type a project title..."
          value={filters.search}
          onChange={(event) => handleChange("search", event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        />
      </div>
      <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-slate-700">Status</span>
          <select
            value={filters.status}
            onChange={(event) =>
              handleChange("status", event.target.value as Filters["status"])
            }
            className="rounded-xl border border-slate-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-slate-700">Type</span>
          <select
            value={filters.type}
            onChange={(event) =>
              handleChange("type", event.target.value as Filters["type"])
            }
            className="rounded-xl border border-slate-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            <option value="all">All types</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-slate-700">Country</span>
          <select
            value={filters.country}
            onChange={(event) =>
              handleChange(
                "country",
                event.target.value as Filters["country"]
              )
            }
            className="rounded-xl border border-slate-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            <option value="all">All countries</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
