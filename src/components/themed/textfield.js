import PropTypes from "prop-types";
import MaterialUiTextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = () => ({
  textField: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#404040",
      },
    },
    "& label.Mui-focused": {
      color: "#ffa500",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  },
});

class TextField extends React.Component {
  render() {
    const { classes, onClick, onChange, ...unusedProps } = this.props;

    return (
      <MaterialUiTextField
        {...unusedProps}
        className={classes.textField}
        onClick={onClick}
        onChange={onChange}
      />
    );
  }
}

TextField.propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.any,
  }),
  onChange: PropTypes.any,
  onClick: PropTypes.any,
};

export default withStyles(styles)(TextField);
