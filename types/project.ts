export type ProjectStatus = "planned" | "active" | "blocked" | "done";

export interface ProjectUpdate {
  id: string;
  projectId: string;
  authorName: string;
  note: string;
  createdAt: string;
  photoUrl?: string | null;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  country: string;
  status: ProjectStatus;
  owner?: string | null;
  percentComplete: number;
  lastUpdateAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
