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

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Clank
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

class PasswordRecovery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailVal: "",
            passwordVal: "",
            emailAuthError: "",
            passwordAuthError: "",
            verifyButtonBeenClicked: false,
            emailSent: false
        }
    }

    handlePasswordRecovery = async (event) => {
        event.preventDefault();
        this.setState({ verifyButtonBeenClicked: true })
        const email = this.state.emailVal
        try {
            if (email) {
                const user = await Auth.forgotPassword(email);
                this.setState({ emailSent: true })
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleCodeConfirmation = async (e) => {
        e.preventDefault();
        try {
            await Auth.forgotPasswordSubmit(this.state.emailVal, this.state.emailCodeVal, this.state.passwordVal);
            this.props.history.push("/sign-in")
        } catch (error) {
            this.setState({codeConfirmError: error.message})
            console.log('error confirming sign up', error);
        }
    }

    handleValidation = (event, authErrorType) => {
        event.preventDefault();
        if (this.state[authErrorType] !== "") {
            this.setState({ [authErrorType]: "" })
        }
    }
    areFieldsFilled = () => {
        return this.state.emailVal !== "" ? false : true
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
                        Recover Your Password
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={(e) => (this.handlePasswordRecovery(e))}
                            disabled={this.areFieldsFilled()}
                        >
                            Sign In
                        </Button>
                        {this.state.verifyButtonBeenClicked && this.state.emailSent ? (
                            <Grid>
                            <TextField
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onClick={(e) => (this.handleValidation(e, "passwordAuthError"))}
                            onChange={(e) => (this.setState({ passwordVal: e.target.value }))}
                        />
                            
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
                                    >Confirm New Password</Button>
                                </Grid>
                            </Grid>
                            </Grid>
                        ) : (null)}
                        <Grid container>
                            <Grid item xs>
                                <Link href="/Sign-in" variant="body2" className={classes.link}>
                                    Sign in
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
PasswordRecovery.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PasswordRecovery);