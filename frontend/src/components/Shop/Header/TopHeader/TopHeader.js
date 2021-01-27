import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import classes from './TopHeader.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SignInModal from 'components/Shop/SignInModal/SignInModal';
import SignUpModal from 'components/Shop/SignUpModal/SignUpModal';
import { Typography } from '@material-ui/core';
import * as action from '../../../../store/actions/index';

const topHeader = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(action.onLogOut())
    setAnchorEl(null);
  };
  let headerDisplay = (   
    <div className={classes.topHeader}>
      <SignInModal />
        <div> /</div>
      <SignUpModal />
    </div>
  )
  if (user) {
    headerDisplay = (
      <div className={classes.topHeader}>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <Avatar alt={user.first_name + " " + user.last_name}>{user.first_name}</Avatar>
          <Typography>
            {user.first_name + " " + user.last_name}
          </Typography>
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
  return headerDisplay;
}

export default memo(topHeader);