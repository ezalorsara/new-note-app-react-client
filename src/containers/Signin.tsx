import React, { FC, FormEvent, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/reducers/auth';
import { CircularProgress } from '@material-ui/core';
import { login as loginService } from '../services/auth';
import { green, red } from '@material-ui/core/colors';

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
    border: '1px solid'+red[500],
    color: red[500],
    padding: '10px 5px',
    textAlign: 'center'
  }
}));

const SignIn:FC = (props) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginSubmit, setLoginSubmit] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  function signInHandler(e:FormEvent) {
    e.preventDefault();
    const params = {
      email : email,
      password: password
    }
    
    setLoginSubmit(true);
    if(email !== "" && password !== ""){
      setLoading(true);
      
      loginService(params, (data)=>{
        if(data.error){
          setLoginError(true);
          setLoginErrorMessage('Email or Password is Incorrect!');
          setLoading(false);
        }else{
          setLoading(false);
          dispatch(loginSuccess({isloggedin: true}));
          history.push("/");
        }
      });
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={signInHandler} noValidate>
          { loginError && <div className={classes.errorMessage}>{loginErrorMessage}</div>}
          <TextField
            error={loginSubmit && email === ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={loginSubmit && email === ""?"Email is required.":""}
            autoFocus
            onChange={(prop)=>{setEmail(prop.target.value)}}
          />
          <TextField
            error={loginSubmit && password === ""}
            helperText={loginSubmit && email === ""?"Password is required.":""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(prop)=>{setPassword(prop.target.value)}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />} 
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouteLink} to="register" variant="body2">
                {"Don't have an account? Sign Up"}
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

export default SignIn;