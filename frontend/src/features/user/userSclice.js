import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

export const loginAsyncThunk = createAsyncThunk("user/login", async (user) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, user);

    return res.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "login failed");
  }
});

export const registerAsyncThunk = createAsyncThunk(
  "user/register",
  async (user) => {
    try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, user);

      return res.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const logoutAsyncThunk = createAsyncThunk("user/logout", async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`);

    localStorage.removeItem("user"); // Clear user data from local storage
    return res.data.data; // Return any necessary data
  } catch (error) {
    return error.response.data; // Handle errors
  }
});

export const updateUserProfileAsyncThunk = createAsyncThunk(
  "user/updateProfile",
  async (userData) => {
    try {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/user/update`, userData);

      return res.data.data; // Return updated user data
    } catch (error) {
      return error.response.data; // Handle errors
    }
  }
);

const initialState = {
  user: user ? user : null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserFromStorage: (state) => {
      localStorage.getItem("user") &&
        (state.user = JSON.parse(localStorage.getItem("user")));
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // register
      .addCase(registerAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsyncThunk.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout
      .addCase(logoutAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsyncThunk.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.loading = false;
        state.user = null; // Clear user data on logout
        state.error = null;
      })
      .addCase(logoutAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update profile
      .addCase(updateUserProfileAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfileAsyncThunk.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload; // Update user data
        state.error = null;
      })
      .addCase(updateUserProfileAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getUserFromStorage } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
