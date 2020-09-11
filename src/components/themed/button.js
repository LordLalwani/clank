import PropTypes from "prop-types";
import MaterialUiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#ffa500",
    "&:hover": {
      backgroundColor: "#404040",
      color: "#ffa500",
    },
  },
});

class Button extends React.Component {
  render() {
    const { classes, onClick, onChange, ...unusedProps } = this.props;

    return (
      <MaterialUiButton
        {...unusedProps}
        className={classes.button}
        onClick={onClick}
        onChange={onChange}
      >
        {this.props.children}
      </MaterialUiButton>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.shape({
    button: PropTypes.any,
  }),
  onChange: PropTypes.any,
  onClick: PropTypes.any,
};

export default withStyles(styles)(Button);
