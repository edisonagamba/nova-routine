import { FrequencyType, TaskData } from "../types";

export const getCurrentDateString = (): string => {
  return new Date().toDateString();
};

export const checkAndResetRecurringTasks = (
  tasks: TaskData[],
  today = getCurrentDateString(),
): TaskData[] => {
  return tasks.map((task) => {
    if (
      task.completed &&
      (task.frequency === FrequencyType.DAILY ||
        task.frequency === FrequencyType.WEEKLY) &&
      task.completedOnDate !== today
    ) {
      return { ...task, completed: false, completedOnDate: undefined };
    }
    return task;
  });
};

export const isTaskActiveToday = (task: TaskData): boolean => {
  const dayMap = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  if (task.frequency === FrequencyType.DAILY) return true;

  if (task.frequency === FrequencyType.MONTHLY) {
    // Simplified for MVP
    return true;
  }

  if (task.frequency === FrequencyType.WEEKLY) {
    const currentDay = new Date().getDay();

    if (task.weeklySchedule && task.weeklySchedule.days.length > 0) {
      return task.weeklySchedule.days.some(
        (dayName) => dayMap[dayName as keyof typeof dayMap] === currentDay,
      );
    }
  }

  return false;
};
