export type Role = "admin" | "staff" | "customer";

export type StageKey =
  | "onboarding"
  | "content"
  | "design"
  | "development"
  | "qa"
  | "devops"
  | "launched";

export type StageStatus =
  | "not_started"
  | "in_progress"
  | "awaiting_approval"
  | "approved"
  | "complete";

export interface Profile {
  id: string;
  role: Role;
  staff_role: string | null;
  full_name: string | null;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  customer_id: string;
  name: string;
  current_stage: StageKey;
  version: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectStage {
  id: string;
  project_id: string;
  stage_key: StageKey;
  position: number;
  status: StageStatus;
}

// Joined type used in admin dashboard
export interface CustomerRow extends Profile {
  projects: (Project & { project_stages: ProjectStage[] })[];
}
