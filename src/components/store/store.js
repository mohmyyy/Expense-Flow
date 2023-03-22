import authSlice from "./auth";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { auth: authSlice },
});

export default store;