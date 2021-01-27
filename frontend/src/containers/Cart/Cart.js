import { Grid } from '@material-ui/core';
import React from 'react';
import Bill from '../../components/Shop/Bill/Bill';
import CartItems from '../../components/Shop/Cart/CartItems/CartItems';

const cart = () => {
  return (
    <Grid container spacing={4}>
      <Grid item md={8} xs={12}>
        <CartItems />
      </Grid>
      <Grid item md={4} xs={12}>
        <Bill enableCheckout />
      </Grid>
    </Grid>
  );
}

export default cart;