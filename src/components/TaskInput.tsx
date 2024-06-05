import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { toast } from "sonner";
import TaskPriority from "../types";

const TaskInput: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium); // Assuming TaskPriority is an enum

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!task) {
      toast.error("Task cannot be empty");
      return;
    }

    dispatch(addTask({ task, priority, completed: false }));
    setTask("");
    toast.success("Task added successfully");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="border p-4 w-full rounded-full mb-2"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        className="border p-4 w-full rounded-full mb-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        {Object.values(TaskPriority).map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500  text-white p-4 rounded-full w-full"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
