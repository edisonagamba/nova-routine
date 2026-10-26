import { FlatList, Text, View } from "react-native";

import { TaskData, FrequencyType } from "../types";
import { TaskItem } from "./TaskItem";
import { styles } from "./TaskSections.styles";

const weekdays = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const weekdayLabels: Record<(typeof weekdays)[number], string> = {
  SUNDAY: "Sun",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
};

interface Props {
  tasks: TaskData[];
  onToggle: (taskId: string) => void;
  onEdit: (task: TaskData) => void;
  onDelete: (taskId: string) => void;
}

export const TaskSections = ({ tasks, onToggle, onEdit, onDelete }: Props) => {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const dailyTasks = pendingTasks.filter(
    (task) => task.frequency === FrequencyType.DAILY,
  );
  const weeklyTasks = pendingTasks.filter(
    (task) => task.frequency === FrequencyType.WEEKLY,
  );
  const monthlyTasks = pendingTasks.filter(
    (task) => task.frequency === FrequencyType.MONTHLY,
  );

  const renderTask = (task: TaskData, detailText?: string) => (
    <TaskRow
      key={task.id}
      task={task}
      detailText={detailText}
      onToggle={onToggle}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );

  return (
    <FlatList
      data={dailyTasks}
      keyExtractor={(task) => task.id}
      renderItem={({ item }) => renderTask(item)}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptySection}>
          <Text style={styles.emptyTitle}>No daily tasks yet.</Text>
        </View>
      }
      ListFooterComponent={
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly tasks</Text>
            {weeklyTasks.length > 0 ? (
              weeklyTasks.map((task) => {
                const scheduledDays = weekdays
                  .filter((day) => task.weeklySchedule?.days.includes(day))
                  .map((day) => weekdayLabels[day])
                  .join(", ");

                return renderTask(task, `Scheduled: ${scheduledDays}`);
              })
            ) : (
              <Text style={styles.sectionEmptyText}>No weekly tasks yet.</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly tasks</Text>
            {monthlyTasks.length > 0 ? (
              monthlyTasks.map((task) => renderTask(task))
            ) : (
              <Text style={styles.sectionEmptyText}>No monthly tasks yet.</Text>
            )}
          </View>
        </>
      }
    />
  );
};

interface TaskRowProps {
  task: TaskData;
  detailText?: string;
  onToggle: (taskId: string) => void;
  onEdit: (task: TaskData) => void;
  onDelete: (taskId: string) => void;
}

const TaskRow = ({
  task,
  detailText,
  onToggle,
  onEdit,
  onDelete,
}: TaskRowProps) => {
  return (
    <TaskItem
      task={task}
      onPress={() => onToggle(task.id)}
      onEdit={() => onEdit(task)}
      onDelete={() => onDelete(task.id)}
      detailText={detailText}
    />
  );
};
