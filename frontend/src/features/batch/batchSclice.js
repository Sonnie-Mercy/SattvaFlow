import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const enrollAsyncThunk = createAsyncThunk(
  "batch/register",
  async (enrollDate) => {
    try {
      const res = await axios.post("/api/batch/register", enrollDate);
      return res.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getUserBatchDetailsAsyncThunk = createAsyncThunk(
  "batch/details",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("api/batch/details");
      const data = res.data.data;
      if (Array.isArray(data)) {
        return data;
      } else {
        return rejectWithValue ("not valid")
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching batch details.");
    }
  }
);

export const batchPaymentAsyncThunk = createAsyncThunk(
  "batch/payment",
  async (batchId) => {
    try {
      const res = await axios.post("/api/batch/payment", { batchId });
      return res.data.data;
    } catch (error) {
      return error.response.data;
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
    // enrollAsyncThunk
    builder
      .addCase(enrollAsyncThunk.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(batchPaymentAsyncThunk.fulfilled, (state, action) => {
        const updatedEnrollmentDetails = state.batch.map((item) =>
          item.batchId === action.payload.batchId
            ? { ...item, paymentStatus: true }
            : item
        );
        state.loading = false;
        state.batch = updatedEnrollmentDetails;
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
