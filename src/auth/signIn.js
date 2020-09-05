import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import Copyright from "../components/common/copyright"

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#ffa500"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#404040',
            },
        },
        '& label.Mui-focused': {
            color: '#ffa500',
        },
        '& .MuiFormHelperText-root': {
            color: 'red',
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#ffa500",
        '&:hover': {
            backgroundColor: "#404040",
            color: "#ffa500"
        },
    },
    link: {
        color: "black"
    }
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailVal: "",
            passwordVal: "",
            emailAuthError: "",
            passwordAuthError: ""
        }
    }

    areFieldsFilled = () => {
        return this.state.emailVal !== "" && this.state.passwordVal !== "" ? false : true
    }

    handleValidation = (event, authErrorType) => {
        event.preventDefault();
        if (this.state[authErrorType] !== "") {
            this.setState({ [authErrorType]: "" })
        }
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const email = this.state.emailVal
        const password = this.state.passwordVal

        try {
            if (email && password) {
                // TODO save user data to redux
                // eslint-disable-next-line
                const user = await Auth.signIn(email, password);
                this.props.history.push("/dashboard")
            }
        } catch (error) {
            switch (error.code) {
                case "UserNotFoundException":
                    this.setState({ emailAuthError: error.message })
                    break;
                case "NotAuthorizedException":
                    this.setState({ passwordAuthError: error.message })
                    break;
                default:
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Into Clank
                </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={this.state.emailAuthError}
                            onClick={(e) => (this.handleValidation(e, "emailAuthError"))}
                            onChange={(e) => (this.setState({ emailVal: e.target.value }))}
                        >
                        </TextField>
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={this.state.passwordAuthError}
                            onClick={(e) => (this.handleValidation(e, "passwordAuthError"))}
                            onChange={(e) => (this.setState({ passwordVal: e.target.value }))}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={(e) => (this.handleSignIn(e))}
                            disabled={this.areFieldsFilled()}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/password-recovery" variant="body2" className={classes.link}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2" className={classes.link}>
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        )
    }
}
SignIn.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);