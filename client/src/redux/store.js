import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer, // 👈 เก็บ user + token
    tasks: taskReducer, // 👈 เก็บ tasks ทั้งหมด
  },
});
