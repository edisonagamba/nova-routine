import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 20,
    color: "#000000",
    fontSize: 24,
    fontWeight: "700",
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D3D5DA",
    borderRadius: 10,
    color: "#21262D",
    fontSize: 16,
  },
  fieldLabel: {
    marginTop: 20,
    marginBottom: 10,
    color: "#21262D",
    fontSize: 15,
    fontWeight: "600",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D3D5DA",
    borderRadius: 21,
  },
  dayButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D3D5DA",
    borderRadius: 21,
  },
  selectedOption: {
    borderColor: "#10B981",
    backgroundColor: "#10B981",
  },
  optionText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  weekdayHint: {
    marginBottom: 10,
    color: "#5F6C7F",
    fontSize: 14,
    lineHeight: 20,
  },
  error: {
    marginTop: 12,
    color: "#B42318",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 24,
  },
  cancelButton: {
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  cancelText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
  saveButton: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#10B981",
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
