import { createSlice } from "@reduxjs/toolkit";

// Load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load tasks from localStorage", e);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem("tasks", serializedState);
  } catch (e) {
    console.warn("Could not save tasks to localStorage", e);
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      const newState = [...state, action.payload];
      saveTasksToLocalStorage(newState);
      return newState;
    },
    deleteTask: (state, action) => {
      const newState = state.filter((_, index) => index !== action.payload);
      saveTasksToLocalStorage(newState);
      return newState;
    },
    editTask: (state, action) => {
      const { index, task } = action.payload;
      state[index].task = task;
      saveTasksToLocalStorage(state);
      return state;
    },
    toggleCompleteTask: (state, action) => {
      state[action.payload].completed = !state[action.payload].completed;
      saveTasksToLocalStorage(state);
      return state;
    },
  },
});

export const { addTask, deleteTask, editTask, toggleCompleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
