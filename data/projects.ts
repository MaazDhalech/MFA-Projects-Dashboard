import { supabase } from "@/lib/supabase";
import { Project, ProjectStatus, ProjectUpdate } from "@/types/project";

interface ProjectRow {
  id: string;
  title: string;
  type: string;
  country: string;
  status: ProjectStatus;
  owner: string | null;
  created_at: string | null;
  updated_at: string | null;
  percent_complete: number | null;
  last_update_at: string | null;
}

interface UpdateRow {
  id: string;
  project_id: string;
  author_name: string;
  note: string;
  photo_url: string | null;
  created_at: string;
}

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase client is not configured. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
    );
  }
  return supabase;
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    country: row.country,
    status: row.status,
    owner: row.owner,
    percentComplete: row.percent_complete ?? 0,
    lastUpdateAt: row.last_update_at ?? null,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

function mapUpdate(row: UpdateRow): ProjectUpdate {
  return {
    id: row.id,
    projectId: row.project_id,
    authorName: row.author_name,
    note: row.note,
    createdAt: row.created_at,
    photoUrl: row.photo_url,
  };
}

export async function listProjects(): Promise<Project[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("project_public")
    .select("*");

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return ((data ?? []) as ProjectRow[])
    .map(mapProject)
    .sort((a, b) => {
      const aPriority = a.status === "active" ? 0 : 1;
      const bPriority = b.status === "active" ? 0 : 1;
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      const aTime = a.lastUpdateAt ? Date.parse(a.lastUpdateAt) : 0;
      const bTime = b.lastUpdateAt ? Date.parse(b.lastUpdateAt) : 0;
      return bTime - aTime;
    });
}

export async function getProjectById(id: string): Promise<Project | null> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("project_public")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    const notFound =
      (error as any).code === "PGRST116" ||
      (error as any).details?.includes("Results contain 0 rows");
    if (notFound) return null;
    throw new Error(`Failed to load project ${id}: ${error.message}`);
  }

  return data ? mapProject(data as ProjectRow) : null;
}

export async function listUpdates(projectId: string): Promise<ProjectUpdate[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("updates_public")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load updates for ${projectId}: ${error.message}`);
  }

  return ((data ?? []) as UpdateRow[]).map(mapUpdate);
}
