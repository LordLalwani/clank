import { increment } from "./slices/userSlice";

// provides dispatch actions in props
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
  };
};

export default mapDispatchToProps;
