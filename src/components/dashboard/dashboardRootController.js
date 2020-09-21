import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import DashboardBrowserView from "./views/dashboardBrowserView";
import DashboardMobileView from "./views/dashboardMobileView";
export default class DashboardRootController extends React.Component {
  render() {
    console.log(this.props);
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
