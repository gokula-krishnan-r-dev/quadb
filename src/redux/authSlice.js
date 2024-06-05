import { createSlice } from "@reduxjs/toolkit";

// Load auth state from localStorage
const loadAuthFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return { isAuthenticated: false };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load auth state from localStorage", e);
    return { isAuthenticated: false };
  }
};

// Save auth state to localStorage
const saveAuthToLocalStorage = (authState) => {
  try {
    const serializedState = JSON.stringify(authState);
    localStorage.setItem("auth", serializedState);
  } catch (e) {
    console.warn("Could not save auth state to localStorage", e);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthFromLocalStorage(),
  reducers: {
    login: (state) => {
      const newState = { ...state, isAuthenticated: true };
      saveAuthToLocalStorage(newState);
      return newState;
    },
    logout: (state) => {
      const newState = { ...state, isAuthenticated: false };
      saveAuthToLocalStorage(newState);
      return newState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
