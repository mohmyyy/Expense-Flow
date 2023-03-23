import authSlice from "./auth";
import themeSlice from "./theme";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { auth: authSlice, theme: themeSlice },
});

export default store;
