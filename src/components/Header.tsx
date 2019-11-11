import React, { FC } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector((state: any) => state.auth);

  function logoutHandle() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            NEW NOTES
          </Typography>

          {auth.isloggedin === false ? (
            <>
              <Button color="inherit" component={Link} to="register">Register</Button>
              <Button color="inherit" component={Link} to="login">Login</Button>
            </>
          ) : (
              <Button color="inherit" onClick={logoutHandle}>Logout</Button>
            )
          }

        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;