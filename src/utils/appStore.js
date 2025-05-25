import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: userFromStorage, // ✅ preload user from localStorage
  },
});

export default appStore;
