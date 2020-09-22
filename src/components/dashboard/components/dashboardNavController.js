import React from "react";
import DashboardNavDrawer from "./dashboardNavDrawer";

export default class DashboardNavController extends React.Component {
  render() {
    const width = () => {
      switch (this.props.applicationState?.drawerOpen) {
        case true: {
          return "auto";
        }
        default: {
          return 0;
        }
      }
    };
    return (
      <div style={{ width: `${width()}` }}>
        <DashboardNavDrawer {...this.props} />
      </div>
    );
  }
}
