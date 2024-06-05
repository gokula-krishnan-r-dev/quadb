import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { toast } from "sonner";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!task) {
      toast.error("Task cannot be empty");
    }
    if (task.trim()) {
      dispatch(addTask({ task, priority }));
      setTask("");
      toast.success("Task added successfully");
    }
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
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
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
