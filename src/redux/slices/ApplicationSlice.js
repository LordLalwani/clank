import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    drawerOpen: true,
    dashboardContext: "Dashboard",
  },
  reducers: {
    toggleDrawer: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setDashboardContext: (state, action) => {
      state.dashboardContext = action.payload;
    },
  },
});

export const { toggleDrawer, setDashboardContext } = applicationSlice.actions;

export default applicationSlice.reducer;
