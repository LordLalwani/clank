import React, { Component } from "react";
import DashboardController from "../components/dashboardController";
import DashboardNavController from "../components/dashboardNavController";

class dashboardMobileView extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <DashboardNavController isMobile={true} {...this.props} />
        <DashboardController />
      </div>
    );
  }
}

export default dashboardMobileView;
