import { addUserToState } from "./slices/userSlice";
import { toggleDrawer, setDashboardContext } from "./slices/applicationSlice";

// provides dispatch actions in props
const mapDispatchToProps = (dispatch) => {
  return {
    addUserToState: (user) => dispatch(addUserToState(user)),
    toggleDrawer: (bool) => dispatch(toggleDrawer(bool)),
    setDashboardContext: (context) => dispatch(setDashboardContext(context)),
  };
};

export default mapDispatchToProps;
