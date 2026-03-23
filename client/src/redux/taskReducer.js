import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../service/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    const res = await api.post("/tasks", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    const res = await api.put(`/tasks/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return id;
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.loading = false;
        s.tasks = a.payload;
      })
      .addCase(fetchTasks.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(createTask.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(createTask.fulfilled, (s, a) => {
        s.loading = false;
        s.tasks.push(a.payload);
      })
      .addCase(createTask.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(updateTask.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(updateTask.fulfilled, (s, a) => {
        s.loading = false;
        const index = s.tasks.findIndex((t) => t._id === a.payload._id);
        if (index !== -1) s.tasks[index] = a.payload;
      })
      .addCase(updateTask.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(deleteTask.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        s.loading = false;
        s.tasks = s.tasks.filter((t) => t._id !== a.payload);
      })
      .addCase(deleteTask.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default taskSlice.reducer;
