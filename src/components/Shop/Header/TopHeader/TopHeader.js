import React from 'react';
import { Typography } from '@material-ui/core';
import classes from './TopHeader.module.css';

const topHeader = () => {
  return (
    <div className={classes.topHeader}>
      <Typography>
        Sign in
      </Typography>
      <div> /</div>
      <Typography>
        Sign up
      </Typography>
    </div>
  )
}

export default topHeader;