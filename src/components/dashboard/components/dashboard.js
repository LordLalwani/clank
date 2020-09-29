import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DashboardContext from "./contexts/dashboardContext";
import InvestContext from "./contexts/investContext";
import WalletContext from "./contexts/walletContext";
import CommunityContext from "./contexts/communityContext";
import SettingsContext from "./contexts/settingsContext";
import LogoutContext from "./contexts/logoutContext";

const styles = (theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f0f4fb",
    height: "100%",
    width: "100%",
  },
});

const getDashboardContext = (dashboardContext) => {
  switch (dashboardContext) {
    case "Dashboard": {
      return <DashboardContext />;
    }
    case "Invest": {
      return <InvestContext />;
    }
    case "Wallet": {
      return <WalletContext />;
    }
    case "Community": {
      return <CommunityContext />;
    }
    case "Settings": {
      return <SettingsContext />;
    }
    case "Logout": {
      return <LogoutContext />;
    }
    default: {
      return <p>dashboard</p>;
    }
  }
};
class Dashboard extends React.Component {
  render() {
    const { classes, applicationState } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {getDashboardContext(applicationState.dashboardContext)}
      </main>
    );
  }
}
export default withStyles(styles)(Dashboard);
