import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { DayOfWeek, FrequencyType, TaskData } from "../types";
import { styles } from "./TaskFormModal.styles";

const weekdays: DayOfWeek[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const weekdayLabels: Record<DayOfWeek, string> = {
  SUNDAY: "Sun",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
};

const frequencies: { value: FrequencyType; label: string }[] = [
  { value: FrequencyType.DAILY, label: "Daily" },
  { value: FrequencyType.WEEKLY, label: "Weekly" },
  { value: FrequencyType.MONTHLY, label: "Monthly" },
];

interface Props {
  visible: boolean;
  task: TaskData | null;
  onClose: () => void;
  onSave: (
    title: string,
    frequency: FrequencyType,
    selectedWeekdays: DayOfWeek[],
  ) => void;
}

export const TaskFormModal = ({ visible, task, onClose, onSave }: Props) => {
  const [title, setTitle] = useState(task?.title ?? "");
  const [frequency, setFrequency] = useState(
    task?.frequency ?? FrequencyType.DAILY,
  );
  const [selectedWeekdays, setSelectedWeekdays] = useState<DayOfWeek[]>(
    task?.weeklySchedule?.days ?? [],
  );
  const [error, setError] = useState("");

  const submit = () => {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      setError("Enter a task name.");
      return;
    }
    if (
      frequency === FrequencyType.WEEKLY &&
      selectedWeekdays.length === 0
    ) {
      setError("Choose at least one day.");
      return;
    }

    onSave(normalizedTitle, frequency, selectedWeekdays);
  };

  const toggleWeekday = (day: DayOfWeek) => {
    setSelectedWeekdays((selected) =>
      selected.includes(day)
        ? selected.filter((selectedDay) => selectedDay !== day)
        : [...selected, day],
    );
    setError("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>{task ? "Edit task" : "Add a task"}</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(value) => {
                setTitle(value);
                setError("");
              }}
              placeholder="What do you want to do?"
              placeholderTextColor="#788498"
              accessibilityLabel="Task name"
              returnKeyType="done"
              onSubmitEditing={submit}
              autoFocus
            />

            <Text style={styles.fieldLabel}>Repeat</Text>
            <View style={styles.optionsRow}>
              {frequencies.map((option) => {
                const isSelected = frequency === option.value;
                return (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.optionButton,
                      isSelected && styles.selectedOption,
                    ]}
                    onPress={() => {
                      setFrequency(option.value);
                      setError("");
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {frequency === FrequencyType.WEEKLY && (
              <>
                <Text style={styles.fieldLabel}>Days</Text>
                <Text style={styles.weekdayHint}>
                  Select one or more days. Tasks scheduled for other days will
                  appear below today&apos;s tasks.
                </Text>
                <View style={styles.optionsRow}>
                  {weekdays.map((day) => {
                    const isSelected = selectedWeekdays.includes(day);
                    return (
                      <Pressable
                        key={day}
                        style={[
                          styles.dayButton,
                          isSelected && styles.selectedOption,
                        ]}
                        onPress={() => toggleWeekday(day)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: isSelected }}
                        accessibilityLabel={weekdayLabels[day]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            isSelected && styles.selectedOptionText,
                          ]}
                        >
                          {weekdayLabels[day]}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </>
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.actions}>
              <Pressable
                style={styles.cancelButton}
                onPress={onClose}
                accessibilityRole="button"
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.saveButton}
                onPress={submit}
                accessibilityRole="button"
              >
                <Text style={styles.saveText}>
                  {task ? "Save changes" : "Save task"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};
