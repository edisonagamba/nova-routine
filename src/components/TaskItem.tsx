import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { TaskData } from "../types";

interface Props {
  task: TaskData;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  detailText?: string;
}

export const TaskItem: React.FC<Props> = ({
  task,
  onPress,
  onEdit,
  onDelete,
  detailText,
}) => {
  return (
    <Swipeable
      containerStyle={styles.swipeable}
      renderRightActions={(_, __, swipeableMethods) =>
        renderActions(swipeableMethods, onEdit, onDelete, task.title, task.id)
      }
      overshootRight={false}
      rightThreshold={40}
    >
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`Mark ${task.title} as ${
            task.completed ? "incomplete" : "complete"
          }`}
          accessibilityState={{ checked: task.completed }}
          testID={`task-button-${task.id}`}
        >
          <View style={[styles.circle, task.completed && styles.checkedCircle]} />

          {task.completed && (
            <View style={styles.checkmarkIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.textContent}>
          <Text
            style={[
              styles.title,
              task.completed ? styles.dimmedTitle : { color: "#21262D" },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          {detailText ? (
            <Text style={styles.detailText}>{detailText}</Text>
          ) : null}
        </View>
      </View>
    </Swipeable>
  );
};

const renderActions = (
  swipeableMethods: SwipeableMethods,
  onEdit: () => void,
  onDelete: () => void,
  title: string,
  taskId: string,
) => (
  <View style={styles.actions}>
    <Pressable
      style={[styles.actionButton, styles.editButton]}
      onPress={() => {
        swipeableMethods.close();
        onEdit();
      }}
      accessibilityRole="button"
      accessibilityLabel={`Edit ${title}`}
      testID={`edit-task-${taskId}`}
    >
      <Text style={styles.editText}>Edit</Text>
    </Pressable>
    <Pressable
      style={[styles.actionButton, styles.deleteButton]}
      onPress={onDelete}
      accessibilityRole="button"
      accessibilityLabel={`Delete ${title}`}
      testID={`delete-task-${taskId}`}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  swipeable: {
    marginHorizontal: 10,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  checkbox: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 24,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5F6C7F",
    backgroundColor: "#FFFFFF",
  },
  checkedCircle: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  checkmarkIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  textContent: {
    flex: 1,
  },
  detailText: {
    marginTop: 3,
    color: "#5F6C7F",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 8,
    paddingRight: 10,
    marginBottom: 8,
  },
  actionButton: {
    minHeight: 72,
    minWidth: 66,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  editButton: {
    backgroundColor: "#DBEAFE",
  },
  editText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  deleteText: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "600",
  },
  dimmedTitle: {
    textDecorationLine: "line-through",
    opacity: 0.6,
    color: "#788498",
  },
});
