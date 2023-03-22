import { createSlice } from "@reduxjs/toolkit";

const checkLoginStatus = localStorage.getItem("token");

const initialAuthState = {
  token: checkLoginStatus,
  isLoggedIn: !!checkLoginStatus, 
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log(state)
      console.log(action.payload)
      state.token = action.payload;
      state.isLoggedIn = !!state.token
      localStorage.setItem("token", state.token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
      state.isLoggedIn = !!state.token
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
