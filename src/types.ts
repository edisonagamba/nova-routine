export enum FrequencyType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export type TaskStatus = "PENDING" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  frequency: FrequencyType;
  completed: boolean;
  completedOnDate?: string;
  createdAt: number;
}

export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export interface WeeklySchedule {
  days: DayOfWeek[];
}

export interface TaskData extends Task {
  weeklySchedule?: WeeklySchedule;
}
