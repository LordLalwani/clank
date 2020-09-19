import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import DashboardBrowserView from "./views/dashboardBrowserView";
import DashboardMobileView from "./views/dashboardMobileView";
export default class DashboardLayout extends React.Component {
  render() {
    return (
      <div>
        <BrowserView>
          <DashboardBrowserView />
        </BrowserView>
        <MobileView>
          <DashboardMobileView />
        </MobileView>
      </div>
    );
  }
}
