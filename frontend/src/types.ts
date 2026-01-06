export enum TaskStatus {
  PENDING = "PENDING",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED"
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  org_id: string;
  created_by: string;
  created_at: string;
  updated_by: string;
}

export type CreateTask = {
    title: string;
    description?: string;
    status: TaskStatus;
}

export type UpdateTask = {
    title?: string;
    description?: string;
    status?: TaskStatus;
}
