import React from "react";
import Grid from "@material-ui/core/Grid";
import DashboardNav from "./dashboardNav";
import Dashboard from "./dashboard";
export default class DashboardLayout extends React.Component {
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
