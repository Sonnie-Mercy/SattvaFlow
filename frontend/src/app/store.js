import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSclice";
import batchReducer from "../features/batch/batchSclice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
