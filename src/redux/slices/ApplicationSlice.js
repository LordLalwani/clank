import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    drawerOpen: true,
    dashboardContext: localStorage.getItem("lastKnownContext") || "Dashboard",
  },
  reducers: {
    toggleDrawer: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setDashboardContext: (state, action) => {
      localStorage.setItem("lastKnownContext", action.payload);
      state.dashboardContext = action.payload;
    },
  },
});

export const { toggleDrawer, setDashboardContext } = applicationSlice.actions;

export default applicationSlice.reducer;
