// provides redux state
const mapStateToProps = (state) => {
  return {
    userState: state.user,
  };
};

export default mapStateToProps;
