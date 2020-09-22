// provides redux state
const mapStateToProps = (state) => {
  return {
    userState: state.userState,
    applicationState: state.applicationState,
  };
};

export default mapStateToProps;
