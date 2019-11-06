import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Typography, Link } from '@material-ui/core';


const Copyright: FC = () => {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" component={RouteLink} to="/">
        Notes Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
  
}

export default Copyright;
