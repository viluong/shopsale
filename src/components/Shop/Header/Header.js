import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconShop from '../IconShop/IconShop';
import Search from '../Search/Search';
import TopHeader from './TopHeader/TopHeader';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '../../UI/Link/Link';
import * as action from '../../../store/actions/index';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 1000,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const header = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const dispatch = useDispatch(); 
  const classes = useStyles();
  const carts = useSelector(state => state.cart.carts);
  const user = useSelector(state => state.auth.user);
  const removeProductCart = (productId) => {
    dispatch(action.removeProductCart(productId))
  }
  const cartItems = carts.map((item, index) => {
    return (
      <ListItem key={index}>
        <ListItemAvatar>
          <img
            src={item.product.image}
            alt=''
            className={classes.imageTooltip} 
            />
        </ListItemAvatar>
        <ListItemText
          className={classes.titleTooltip}
          primary={item.product.name}
          secondary={secondary ? 'Secondary text' : null}
        >
          {item.product.name}
        </ListItemText>
        <ListItemText 
          className={classes.quantityTooltip}
        >
          x {item.quantity}
        </ListItemText>
        <ListItemSecondaryAction className={classes.iconTooltip} onClick={() => removeProductCart(item.product.id)}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })
  let cartButttonIcon = (
    <Link href="/cart" color="inherit">
      <IconButton aria-label="shop icon" edge="end" color="inherit" className={classes.shopingCart}>
        <StyledBadge badgeContent={carts.length} color="secondary">
          <ShoppingCartIcon fontSize="large"/>
        </StyledBadge>
      </IconButton>
    </Link>
  );

  if (carts.length > 0) {
    const cartTooltip = (
      <div className={classes.toolTip}>
        <List dense={dense}>
          {cartItems}
        </List>
      </div> 
    )
    cartButttonIcon = (
      <HtmlTooltip
        interactive
        title={cartTooltip}
      >
        <Link href="/cart" color="inherit">
          <IconButton aria-label="shop icon" edge="end" color="inherit" className={classes.shopingCart}>
            <StyledBadge badgeContent={carts.length} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </StyledBadge>
          </IconButton>
        </Link>
      </HtmlTooltip>
    )
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.AppBar}>
        <Container>
          <TopHeader user={user} />
          <Toolbar className={classes.toolbar} disableGutters>
            <IconShop />
            <Search />
            {cartButttonIcon}
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
  imageTooltip: {
    maxWidth: 25,
    maxHeight: 25
  },
  toolTip: {
    backgroundColor: theme.palette.background.paper,
  },
  titleTooltip: {
    fontSize: 25
  },
  iconTooltip: {
    fontSize: 25
  },
  quantityTooltip: {
    fontSize: 25
  }
}));

export default header;