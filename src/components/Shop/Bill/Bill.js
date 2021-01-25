import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Typography } from '@material-ui/core';
import Link from 'components/UI/Link/Link';
import * as utils from 'utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const bill = (props) => {
  const classes = useStyles();
  const [delivery, setDelivery ] = useState(0)
  const carts = useSelector(state => state.cart.carts)
  const subtotal = utils.subtotalBill(carts)
  const total = utils.totalBill(subtotal, delivery)
  const checkoutButton = props.enableCheckout ? 
    (<ListItem>
      <Link href="/checkout">
        <Button
          variant="contained"
          color="primary"
          fullWidth
        >
          Checkout
        </Button>
      </Link>
    </ListItem>) :
      '';

  return (
    <List dense className={classes.root}>
      <ListItem>
        <ListItemText id="subtotal" primary="Subtotal" />
        <ListItemSecondaryAction>
          <Typography>{utils.formatCurrencyVND(subtotal)}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="delivery" primary="Delivery" />
        <ListItemSecondaryAction>
          <Typography>{utils.formatCurrencyVND(delivery)}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <hr style={{ borderTop: "1px solid rgb(189 189 189)", width: "92%" }} />
      <ListItem>
        <ListItemText id="total" primary="Total" />
        <ListItemSecondaryAction>
          <Typography>{utils.formatCurrencyVND(total)}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      {checkoutButton}
    </List>
  );
}

export default bill;