import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TaskFormModal } from "../components/TaskFormModal";
import { TaskSections } from "../components/TaskSections";
import { DayOfWeek, FrequencyType, TaskData } from "../types";
import { useTasks } from "../hooks/useTasks";
import { styles } from "./TasksScreen.styles";

export const TasksScreen = () => {
  const { tasks, currentDateString, toggleTask, saveTask, deleteTask } =
    useTasks();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const handleSave = (
    title: string,
    frequency: FrequencyType,
    weekdays: DayOfWeek[],
  ) => {
    saveTask({ title, frequency, weekdays }, editingTask?.id ?? null);
    closeForm();
  };

  const editTask = (task: TaskData) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Focus</Text>
          <Text style={styles.subtitle}>{currentDateString}</Text>
        </View>

        <TaskSections
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />

        <View style={styles.footer}>
          <Pressable
            style={styles.addButton}
            onPress={() => setIsFormVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Add task"
          >
            <Text style={styles.addButtonText}>+ Add task</Text>
          </Pressable>
        </View>

        {isFormVisible ? (
          <TaskFormModal
            key={editingTask?.id ?? "new-task"}
            visible
            task={editingTask}
            onClose={closeForm}
            onSave={handleSave}
          />
        ) : null}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
