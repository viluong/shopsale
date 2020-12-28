import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconShop from '../IconShop/IconShop';
import Search from '../Search/Search';
import TopHeader from './TopHeader/TopHeader';

const header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.AppBar}>
        <Container>
          <TopHeader/>
          <Toolbar className={classes.toolbar} disableGutters>
            <IconShop />
            <Search />
            <IconButton aria-label="shop icon" edge="end" color="inherit" className={classes.shopingCart}>
              <ShoppingCartIcon fontSize="large"/>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: '#00acc1'
  },
  toolbar: {
    maxHeight: 80,
  },
  shopingCart: {
    marginLeft: 30
  },
}));

export default header;