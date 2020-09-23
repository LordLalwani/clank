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
});

class DashboardNavDrawer extends React.Component {
  render() {
    const handleDrawerOpen = (e) => {
      e.preventDefault();
      this.props.toggleDrawer(!this.props.applicationState.drawerOpen);
    };

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.applicationState?.drawerOpen,
          })}
        >
          <Toolbar>
            <div hidden={!this.props.isMobile}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={(e) => handleDrawerOpen(e)}
                edge="start"
              >
                {this.props.applicationState.drawerOpen ? (
                  <ChevronLeftIcon />
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            </div>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.applicationState?.drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {["Dashboard", "Invest", "Wallet", "Community"].map(
              (text, index) => (
                <ListItem button key={text}>
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
            <Divider />
            {["Settings", "Logout"].map((text, index) => (
              <ListItem button key={text}>
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
