import React, { FC, useState, FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import { CircularProgress, Divider } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { register as registerService, verifyRegistrationCode as verifyRegistrationCodeService } from '../services/auth';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { AuthErrorMessage } from '@aws-amplify/auth/lib-esm/types';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: 'calc(50% - 50px)',
    marginTop: -12,
    marginLeft: -12,
  },
  errorMessage: {
    border: '1px solid' + red[500],
    color: red[500],
    padding: '10px 5px',
    textAlign: 'center'
  }
}));

const Signup: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [newUser, setNewUser] = useState<Object | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [signupError, setSignupError] = useState<boolean>(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>("");
  const [signupVerificationError, setSignupVerificationError] = useState<boolean>(false);
  const [signupVerificationErrorMessage, setSignupVerificationErrorMessage] = useState<string>("");
  const [successAccountVerification, setSuccessAccountVerification] = useState<boolean>(false);

  let signupFormErrStruc = {
    error: false,
    fullname: {
      error: false,
      message: ""
    },
    email: {
      error: false,
      message: ""
    },
    password: {
      error: false,
      message: ""
    },
    confirmPassword: {
      error: false,
      message: ""
    },
  }
  const [signupFormErr, setSignupFormErr] = useState(signupFormErrStruc);
 


  function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async function doRegister(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    // Check FORM VALIDATION
    signupFormErr.error = false;
    if (fullname === "") {
      signupFormErr.fullname.error = true;
      signupFormErr.fullname.message = "Full Name is required.";
      signupFormErr.error = true;
    }

    if (email === "") {
      signupFormErr.email.error = true;
      signupFormErr.email.message = "Email address is required.";
      signupFormErr.error = true;
    }

    if (email != "" && validateEmail(email) === false) {
      signupFormErr.email.error = true;
      signupFormErr.email.message = "Must be valid email address.";
      signupFormErr.error = true;
    }

    if (password == "") {
      signupFormErr.password.error = true;
      signupFormErr.password.message = "Password is required.";
      signupFormErr.error = true;
    }

    if (confirmPassword !== password && password != "") {
      signupFormErr.confirmPassword.error = true;
      signupFormErr.confirmPassword.message = "Must match the password.";
      signupFormErr.error = true;
    }

  
    if (signupFormErr.error === false) {
      setLoading(true);
      try {
        let result = await registerService({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          fullname: fullname
        });

        setLoading(false);
        setNewUser(result);
        setSubmitted(false);
      } catch (e) {
        setLoading(false);
        setSignupError(true);
        setSignupErrorMessage(e.message);
      }
    }

    


  }

  async function doVerifyConfirmationCode(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    try {
      let payload = { email: email, verificationCode: verificationCode }
      const result = await verifyRegistrationCodeService(payload);
      if (result) {
        setSuccessAccountVerification(true);
      }
    } catch (e) {
      console.log("Error: ", e.message);
      setSignupVerificationError(true);
      setSignupVerificationErrorMessage(e.message);
      setSubmitted(false);
      setLoading(false);
    }
  }

  function renderRegisterForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={doRegister} method="post" noValidate>
            {signupError && <div className={classes.errorMessage}>{signupErrorMessage}</div>}
            <TextField
              helperText={submitted && signupFormErr.fullname.message}
              error={submitted && signupFormErr.fullname.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="full_name"
              label="Full Name"
              name="full_name"
              autoComplete="full_name"
              onChange={(prop) => { setFullname(prop.target.value) }}
              autoFocus
            />
            <TextField
              helperText={submitted && signupFormErr.email.message}
              error={submitted && signupFormErr.email.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(prop) => { setEmail(prop.target.value) }}
              autoComplete="email"
            />
            <TextField
              helperText={submitted && signupFormErr.password.message}
              error={submitted && signupFormErr.password.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(prop) => { setPassword(prop.target.value) }}
              autoComplete="current-password"
            />
            <TextField
              helperText={submitted && signupFormErr.confirmPassword.message}
              error={submitted && signupFormErr.confirmPassword.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              onChange={(prop) => { setConfirmPassword(prop.target.value) }}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouteLink} to="login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  function renderConfirmationForm() {
    return <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify Account
          </Typography>
        <form className={classes.form} onSubmit={doVerifyConfirmationCode} noValidate>
          {signupVerificationError && <div className={classes.errorMessage}>{signupVerificationErrorMessage}</div>}
          <TextField
            helperText={(submitted && verificationCode == "") && "This field is required!"}
            error={submitted && verificationCode === ""}
            variant="outlined"
            margin="normal"
            value={verificationCode}
            required
            fullWidth
            id="confirmation_code"
            label="Confirmation Code"
            name="confirmation_code"
            onChange={(props) => { setVerificationCode(props.target.value) }}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            Verify
            </Button>
          <Grid container>
            <Grid item>
              <Link component={RouteLink} to="login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  }

  function renderSuccessConfirmation() {
    return <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account is verified
        <Divider light />
        </Typography>
        <p>
          You can now
          <Link component={RouteLink} to="/login" className={classes.link}>
              Login
          </Link>
        </p>


      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  }

  return (
    <>
      {successAccountVerification ? (
        renderSuccessConfirmation()
      ) : (
        newUser === null
          ? renderRegisterForm()
          : renderConfirmationForm()
      )}
    </>
  )
}

export default Signup;