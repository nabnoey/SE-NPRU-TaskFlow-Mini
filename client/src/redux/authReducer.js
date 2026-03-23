import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../service/api";

// register

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// login
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// get user
export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.authUser = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.authUser = a.payload.user;
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(fetchMe.fulfilled, (s, a) => {
        s.authUser = a.payload;
      })

      .addCase(register.pending, (s) => {
        s.loading = true;
      })
      .addCase(register.fulfilled, (s, a) => {
        s.loading = false;
        // 👉 register อาจไม่ต้อง set token ก็ได้ (ขึ้นกับ backend)
      })
      .addCase(register.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
