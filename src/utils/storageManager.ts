import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskData } from "../types";

const TASKS_KEY = "@TASK_DATA_V1";

export const loadTasks = async (): Promise<TaskData[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading tasks:", e);
    return null;
  }
};

export const saveTasks = async (tasks: TaskData[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Error saving tasks:", e);
  }
};
