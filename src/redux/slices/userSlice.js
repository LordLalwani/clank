import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userState",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    addUserToState: (state, action) => {
      state.authenticatedUser = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { addUserToState } = userSlice.actions;

export default userSlice.reducer;
