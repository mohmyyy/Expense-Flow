import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  darkMode: false,
  activatePremium: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    darkModeActivate(state) {
      state.darkMode = !state.darkMode;
    },
    activatePremium(state,action) {
      state.activatePremium = action.payload;
    },
  },
});

export const themeSliceAction = themeSlice.actions;
export default themeSlice.reducer;
