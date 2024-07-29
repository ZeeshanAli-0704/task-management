import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    isAdmin: false,
    isUserAuthenticated: false,
  },
  reducers: {
    onLoginSuccess: (state, action) => {
      return { ...state, ...action.payload };
    },
    onLoginError: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { onLoginSuccess, onLoginError } = userSlice.actions;
// export const userInfo = (state) => state.user;
export default userSlice.reducer;
