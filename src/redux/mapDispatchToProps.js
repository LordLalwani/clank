import { addUserToState } from "./slices/userSlice";
import { toggleDrawer } from "./slices/ApplicationSlice";

// provides dispatch actions in props
const mapDispatchToProps = (dispatch) => {
  return {
    addUserToState: (user) => dispatch(addUserToState(user)),
    toggleDrawer: (bool) => dispatch(toggleDrawer(bool)),
  };
};

export default mapDispatchToProps;
