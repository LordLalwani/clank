import React from "react";
import DashboardNavDrawer from "./dashboardNavDrawer";

export default class DashboardNavController extends React.Component {
  render() {
    return (
      <div>
        <DashboardNavDrawer {...this.props} />
      </div>
    );
  }
}
