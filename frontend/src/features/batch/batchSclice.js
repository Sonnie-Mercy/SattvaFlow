import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const enrollAsyncThunk = createAsyncThunk(
  "batch/register",
  async ({ batch, enrollDate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/batch/register`, { batch, enrollDate });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Enrollment failed.");
    }
  }
);

export const getUserBatchDetailsAsyncThunk = createAsyncThunk(
  "batch/details",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token; // Retrieve token from localStorage
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/batch/details`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      const data = res.data.data;
      if (Array.isArray(data)) {
        return data;
      } else {
        return rejectWithValue("Invalid response format.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching batch details.");
    }
  }
);

export const batchPaymentAsyncThunk = createAsyncThunk(
  "batch/payment",
  async (batchId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/batch/payment`, { batchId });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment failed.");
    }
  }
);

const initialState = {
  batch: [],
  loading: false,
  error: null,
};

export const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // enrollAsyncThunk
      .addCase(enrollAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.batch.push(action.payload);
      })
      .addCase(enrollAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getUserBatchDetailsAsyncThunk
      .addCase(getUserBatchDetailsAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBatchDetailsAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.batch = action.payload;
      })
      .addCase(getUserBatchDetailsAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // batchPaymentAsyncThunk
      .addCase(batchPaymentAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchPaymentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.batch = state.batch.map((item) =>
          item.batchId === action.payload.batchId
            ? { ...item, paymentStatus: true }
            : item
        );
      })
      .addCase(batchPaymentAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectBatch = (state) => state.batch.batch;
export const selectBatchLoading = (state) => state.batch.loading;
export const selectBatchError = (state) => state.batch.error;

export default batchSlice.reducer;