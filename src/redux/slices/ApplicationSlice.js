import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    drawerOpen: true,
  },
  reducers: {
    toggleDrawer: (state, action) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const { toggleDrawer } = applicationSlice.actions;

export default applicationSlice.reducer;
