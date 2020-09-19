import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import Dashboard from "../components/dashboard";
import DashboardNav from "../components/dashboardNav";

class dashboardBrowserView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Grid container wrap={"nowrap"}>
          <Grid item xs={2}>
            <DashboardNav />
          </Grid>
          <Grid item xs={10} alignItems={"stretch"}>
            <Dashboard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default dashboardBrowserView;
