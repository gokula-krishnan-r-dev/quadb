import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask, toggleCompleteTask } from "../redux/taskSlice";
import { toast } from "sonner";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setEditingTask(task.task);

    toast.info("You are in edit mode. Update the task and click save!");
  };

  const handleSave = (index) => {
    dispatch(editTask({ index, task: editingTask }));
    setEditingIndex(null);
    setEditingTask("");
    toast.success("Task updated successfully!");
  };

  const handleToggleComplete = (index) => {
    dispatch(toggleCompleteTask(index));
    toast.success("Task status updated successfully!");
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.priority === filter
  );

  return (
    <div className="max-w-xl overflow-y-scroll min-h-[440px] mx-auto">
      <div className="flex justify-end mb-4">
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl mb-2 flex lg:flex-row flex-col justify-between   items-start lg:items-center ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div className="">
              {editingIndex === index ? (
                <div className="flex-grow">
                  <input
                    type="text"
                    className="border p-2 w-full rounded mb-2"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex-grow">
                  <p
                    className={`font-semibold text-2xl ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.task}
                  </p>
                  <p className="text-sm text-gray-600">
                    Priority:
                    <span
                      className={`text-xs ml-2 font-semibold ${
                        task.priority === "High"
                          ? "text-red-500"
                          : task.priority === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="flex lg:mt-0 mt-3 space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleToggleComplete(index)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => handleEdit(index, task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  dispatch(deleteTask(index));
                  toast.success("Task deleted successfully!");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">
          No tasks available. Add a new task!
        </p>
      )}
    </div>
  );
};

export default TaskList;
