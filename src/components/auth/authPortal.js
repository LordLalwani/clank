import PropTypes from "prop-types";
import React from "react";

export default class AuthPortal extends React.Component {
  render() {
    return (
      <div style={{ alignItems: "center", display: "flex", height: "90vh" }}>
        {this.props.children}
      </div>
    );
  }
}

AuthPortal.propTypes = {
  children: PropTypes.any,
};
