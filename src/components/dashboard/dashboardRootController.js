import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import DashboardBrowserView from "./views/dashboardBrowserView";
import DashboardMobileView from "./views/dashboardMobileView";
export default class DashboardRootController extends React.Component {
  render() {
    return (
      <div>
        <BrowserView>
          <DashboardBrowserView {...this.props} />
        </BrowserView>
        <MobileView>
          <DashboardMobileView {...this.props} />
        </MobileView>
      </div>
    );
  }
}
