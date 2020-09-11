import { addUserToState } from "./slices/userSlice";

// provides dispatch actions in props
const mapDispatchToProps = (dispatch) => {
  return {
    addUserToState: (user) => dispatch(addUserToState(user)),
  };
};

export default mapDispatchToProps;
