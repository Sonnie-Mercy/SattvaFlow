import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

export const loginAsyncThunk = createAsyncThunk("user/login", async (user) => {
  try {
    const res = await axios.post("/api/auth/login", user);
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
});

export const registerAsyncThunk = createAsyncThunk(
  "user/register",
  async (user) => {
    try {
      const res = await axios.post("/api/auth/register", user);
      return res.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const logoutAsyncThunk = createAsyncThunk("user/logout", async () => {
  try {
    const res = await axios.get("/api/auth/logout");
    // return res.data.data;
  } catch (error) {
    return error.response.data;
  }
});

// export const getUserProfileAsyncThunk = createAsyncThunk(
//   "user/profile",
//   async (token) => {
//     const { data } = await axios.get("/api/users/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   }
// );

export const updateUserProfileAsyncThunk = createAsyncThunk(
  "user/update",
  async (user) => {
    const res = await axios.patch("/api/user/update", user);
    return res.data.data;
  }
);

// export const changePasswordAsyncThunk = createAsyncThunk(
//   "user/changePassword",
//   async ({ user, token }) => {
//     const { data } = await axios.patch("/api/users/change-password", user, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   }
// );

const initialState = {
  user: user ? user : null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // get user from local storage
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
      .addCase(logoutAsyncThunk.fulfilled, (state, action) => {
        localStorage.removeItem("user");

        state.loading = false;
        state.user = action.payload;
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
        state.user = action.payload;
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
