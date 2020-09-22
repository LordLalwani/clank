import React, { Component } from "react";
import DashboardController from "../components/dashboardController";
import DashboardNavController from "../components/dashboardNavController";

class dashboardBrowserView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{ display: "flex" }}>
        <DashboardNavController {...this.props} />
        <DashboardController />
      </div>
    );
  }
}

export default dashboardBrowserView;
