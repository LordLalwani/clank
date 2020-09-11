import PropTypes from "prop-types";
import React from "react";
import { floatingCogs } from "hero-patterns";

export default class AuthPortal extends React.Component {
  render() {
    const style1 = {
      alignItems: "center",
      display: "flex",
      height: "100vh",
      backgroundImage: floatingCogs("#ffa501", 0.1),
    };
    return <div style={style1}>{this.props.children}</div>;
  }
}

AuthPortal.propTypes = {
  children: PropTypes.any,
};
