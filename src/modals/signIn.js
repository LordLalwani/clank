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

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();

        this.state = {
            userAuthError: "",
            passwordAuthError: ""
        }
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const email = this.emailRef.current.value
        const password = this.passwordRef.current.value

        try {
            if (email && password) {
                const user = await Auth.signIn(email, password);
                // send to redux
                console.log(user)
            }
        } catch (error) {
            console.log('error signing in', error);
            switch (error.code) {
                case "UserNotFoundException":
                    this.setState({ userAuthError: error.message })
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
                        Welcome To Clank
                </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            inputRef={this.emailRef}
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
                            helperText={this.state.userAuthError}
                        >
                        </TextField>
                        <TextField
                            inputRef={this.passwordRef}
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={(e) => (this.handleSignIn(e))}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" className={classes.link}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" className={classes.link}>
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