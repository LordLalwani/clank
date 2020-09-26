import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { getDashboardContextIcon } from "../utils/dashboardUtils";
import clsx from "clsx";
import React from "react";

const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `100%`,
    marginLeft: drawerWidth,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuContextHeader: {
    marginLeft: "0.5rem",
  },
  menuContext: {
    margin: " 0 auto",
    alignItems: "center",
    display: "flex",
  },
  paperAnchorDockedLeft: {
    borderRight: "0px",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  listBottom: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
  onSelected: {
    backgroundColor: "#e0efff!important",
  },
  rootListItem: {
    "&:hover": {
      backgroundColor: "#f9fcff",
    },
  },
});

class DashboardNavDrawer extends React.Component {
  render() {
    const {
      classes,
      applicationState,
      isMobile,
      toggleDrawer,
      setDashboardContext,
    } = this.props;

    const handleDrawerOpen = (e) => {
      e.preventDefault();
      toggleDrawer(!applicationState.drawerOpen);
    };

    const ChangeDashboardContext = (e, context) => {
      e.preventDefault();
      setDashboardContext(context);
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: applicationState?.drawerOpen,
          })}
        >
          <Toolbar>
            <div hidden={!isMobile}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={(e) => handleDrawerOpen(e)}
                edge="start"
              >
                {applicationState.drawerOpen ? (
                  <ChevronLeftIcon />
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            </div>
            <div className={classes.menuContext}>
              {getDashboardContextIcon(applicationState.dashboardContext)}
              <Typography
                variant="h6"
                noWrap
                className={classes.menuContextHeader}
              >
                {applicationState.dashboardContext}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={applicationState?.drawerOpen}
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
          }}
        >
          <div className={classes.toolbar} />
          <Divider variant="middle" light={true} />
          <List>
            {["Dashboard", "Invest", "Wallet", "Community"].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={(e) => ChangeDashboardContext(e, text)}
                  selected={text === applicationState.dashboardContext}
                  classes={{
                    root: classes.rootListItem,
                    selected: classes.onSelected,
                  }}
                >
                  <ListItemIcon>
                    {index === 0 ? <DashboardIcon /> : null}
                    {index === 1 ? <ShowChartIcon /> : null}
                    {index === 2 ? <AccountBalanceWalletIcon /> : null}
                    {index === 3 ? <SupervisedUserCircleIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <List className={classes.listBottom}>
            <Divider variant="middle" light={true} />
            {["Settings", "Logout"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={(e) => ChangeDashboardContext(e, text)}
                selected={text === applicationState.dashboardContext}
                classes={{
                  root: classes.rootListItem,
                  selected: classes.onSelected,
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <SettingsIcon /> : <ExitToAppIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardNavDrawer);
