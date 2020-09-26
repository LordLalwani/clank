import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./slices/applicationSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    userState: userReducer,
    applicationState: applicationReducer,
  },
});
