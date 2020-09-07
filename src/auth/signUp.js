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
import AuthPortal from "./authPortal"

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

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailVal: "",
            passwordVal: "",
            ConfirmPasswordVal: "",
            emailAuthError: "",
            passwordAuthError: "",
            ConfirmPasswordAuthError: "",
            emailCodeVal: "",
            verifyButtonBeenClicked: false,
            errorExists: false,
            emailSent: false
        }
    }

    areFieldsFilled = () => {
        return this.state.emailVal !== "" && this.state.passwordVal !== "" && this.state.ConfirmPasswordVal !== "" ? true : false
    }

    doPasswordsMatch = () => {
        return this.state.passwordVal === this.state.ConfirmPasswordVal ? true : false
    }

    canSubmitForVerification = () => {
        return this.doPasswordsMatch() && this.areFieldsFilled()
    }

    handleValidation = (event, authErrorType) => {
        event.preventDefault();
        if (this.state[authErrorType] !== "") {
            this.setState({ [authErrorType]: "" })
        }
        this.setState({errorExists: false})
    }

    handleCodeConfirmation = async (e) => {
        e.preventDefault();
        try {
            await Auth.confirmSignUp(this.state.emailVal, this.state.emailCodeVal);
            this.props.history.push("/sign-in")
        } catch (error) {
            this.setState({codeConfirmError: error.message})
            console.log('error confirming sign up', error);
        }
    }

    displayPasswordsMatch = () => {
        if(this.state.passwordVal.length > 0 && this.state.ConfirmPasswordVal.length>0 && !this.doPasswordsMatch()) {
            return true
        }
    }

    handleSignUp = async (event) => {
        event.preventDefault();
        const username = this.state.emailVal
        const password = this.state.passwordVal
        this.setState({ verifyButtonBeenClicked: true })

        try {
            const { user } = await Auth.signUp({
                username,
                password,
            });
            //do something
            console.log(user);
            this.setState({emailSent: true})

        } catch (error) {
            console.error(error)
            this.setState({errorExists: true})
            switch (error.code) {
                case "UserNotFoundException":
                    this.setState({ emailAuthError: error.message })
                    break;
                case "NotAuthorizedException":
                    this.setState({ ConfirmPasswordAuthError: error.message })
                    break;
                case "InvalidParameterException":
                    this.setState({ ConfirmPasswordAuthError: error.message })
                    break;
                case "UsernameExistsException": 
                    this.setState({ emailAuthError: error.message })
                    break;
                    case "InvalidPasswordException": 
                    this.setState({ ConfirmPasswordAuthError: "Password needs to be a minimum of 8 character" })
                    break;
                default:
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <AuthPortal>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up to Clank
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
                            onClick={(e) => (this.handleValidation(e, "passwordAuthError"))}
                            onChange={(e) => (this.setState({ passwordVal: e.target.value }))}
                        />
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Confirm Password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={this.state.ConfirmPasswordAuthError}
                            onClick={(e) => (this.handleValidation(e, "ConfirmPasswordAuthError"))}
                            onChange={(e) => (this.setState({ ConfirmPasswordVal: e.target.value }))}
                        />
                        {this.displayPasswordsMatch() ? (<div style={{color:"red"}}>Passwords don't match</div>): (null)}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={(e) => (this.handleSignUp(e))}
                            disabled={!this.canSubmitForVerification()}
                        >
                            Verify My Email
                        </Button>
                        {this.state.verifyButtonBeenClicked && this.state.emailSent? (
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="code"
                                        label="Confirm Code"
                                        name="code"
                                        autoComplete="code"
                                        autoFocus
                                        helperText={this.state.codeConfirmError}
                                        onChange={(e) => (this.setState({ emailCodeVal: e.target.value }))}
                                        onClick={(e) => (this.handleValidation(e, "codeConfirmError"))}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                        onClick={(e) => (this.handleCodeConfirmation(e))}
                                    >Confirm</Button>
                                </Grid>
                            </Grid>
                        ) : (null)}
                        <Grid container>
                            <Grid item xs>
                                <Link href="/password-recovery" variant="body2" className={classes.link}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-in" variant="body2" className={classes.link}>
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
            </AuthPortal>)
    }
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);