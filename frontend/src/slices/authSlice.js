import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null; // Reset userInfo to null on logout
      localStorage.removeItem("userInfo"); // Remove userInfo from local storage
    },
  },
});

export const { setCredentials, logout } = authSlice.actions; // Export the action to be used in components

export default authSlice.reducer; // Export the reducer to be used in the store
