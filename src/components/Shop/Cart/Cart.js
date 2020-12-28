import { Grid } from '@material-ui/core';
import React from 'react';
import Bill from '../Bill/Bill';
import CartItems from './CartItems/CartItems';

const cart = () => {
  return (
    <Grid container spacing={4}>
      <Grid item md={8} xs={12}>
        <CartItems />
      </Grid>
      <Grid item md={4} xs={12}>
        <Bill/>
      </Grid>
    </Grid>
  );
}

export default cart;