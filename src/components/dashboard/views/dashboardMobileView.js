import React, { Component } from "react";
import DashboardController from "../components/dashboardController";
import DashboardNavController from "../components/dashboardNavController";

class dashboardMobileView extends Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <DashboardNavController isMobile={true} {...this.props} />
        <DashboardController {...this.props} />
      </div>
    );
  }
}

export default dashboardMobileView;
