import React from "react";
import { withStyles } from "@material-ui/core/styles";

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
class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    );
  }
}
export default withStyles(styles)(Dashboard);
