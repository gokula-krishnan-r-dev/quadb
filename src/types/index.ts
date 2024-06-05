export interface Task {
  task: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}
enum TaskPriority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}
export default TaskPriority;
