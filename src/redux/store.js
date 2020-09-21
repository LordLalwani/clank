import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/ApplicationSlice";

export default configureStore({
  reducer: {
    userState: userReducer,
    applicationState: applicationReducer,
  },
});
