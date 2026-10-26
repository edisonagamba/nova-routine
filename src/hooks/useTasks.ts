import { useEffect, useState } from "react";

import { FrequencyType, TaskData, DayOfWeek } from "../types";
import {
  checkAndResetRecurringTasks,
  getCurrentDateString,
} from "../utils/dateUtils";
import { loadTasks, saveTasks } from "../utils/storageManager";

interface TaskChanges {
  title: string;
  frequency: FrequencyType;
  weekdays: DayOfWeek[];
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [hasLoadedTasks, setHasLoadedTasks] = useState(false);
  const [currentDateString, setCurrentDateString] = useState(
    getCurrentDateString(),
  );

  useEffect(() => {
    let isMounted = true;

    loadTasks().then((data) => {
      if (!isMounted) return;

      setTasks(checkAndResetRecurringTasks(data ?? []));
      setHasLoadedTasks(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const checkForDateChange = () => {
      const nextDate = getCurrentDateString();

      if (nextDate !== currentDateString) {
        setCurrentDateString(nextDate);
        setTasks((previousTasks) =>
          checkAndResetRecurringTasks(previousTasks, nextDate),
        );
      }
    };

    const intervalId = setInterval(checkForDateChange, 30000);
    checkForDateChange();

    return () => clearInterval(intervalId);
  }, [currentDateString]);

  useEffect(() => {
    if (hasLoadedTasks) {
      saveTasks(tasks);
    }
  }, [hasLoadedTasks, tasks]);

  const toggleTask = (taskId: string) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedOnDate: task.completed
                ? undefined
                : getCurrentDateString(),
            }
          : task,
      ),
    );
  };

  const saveTask = (changes: TaskChanges, editingTaskId: string | null) => {
    setTasks((previousTasks) => {
      if (editingTaskId) {
        return previousTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: changes.title,
                frequency: changes.frequency,
                weeklySchedule:
                  changes.frequency === FrequencyType.WEEKLY
                    ? { days: changes.weekdays }
                    : undefined,
              }
            : task,
        );
      }

      const task: TaskData = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: changes.title,
        frequency: changes.frequency,
        createdAt: Date.now(),
        completed: false,
        ...(changes.frequency === FrequencyType.WEEKLY
          ? { weeklySchedule: { days: changes.weekdays } }
          : {}),
      };

      return [...previousTasks, task];
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  return {
    tasks,
    currentDateString,
    toggleTask,
    saveTask,
    deleteTask,
  };
};
