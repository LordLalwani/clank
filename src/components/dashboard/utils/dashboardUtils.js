import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import React from "react";

export const getDashboardContextIcon = (dashboardContext) => {
  switch (dashboardContext) {
    case "Dashboard": {
      return <DashboardIcon />;
    }
    case "Invest": {
      return <ShowChartIcon />;
    }
    case "Wallet": {
      return <AccountBalanceWalletIcon />;
    }
    case "Community": {
      return <SupervisedUserCircleIcon />;
    }
    case "Settings": {
      return <SettingsIcon />;
    }
    case "Logout": {
      return <ExitToAppIcon />;
    }
    default: {
      return <DashboardIcon />;
    }
  }
};
