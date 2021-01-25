import { Grid } from '@material-ui/core';
import React from 'react';
import Bill from '../../components/Shop/Bill/Bill';
import CheckoutForm from '../../components/Shop/CheckoutForm/CheckoutForm';

const checkout = () => {
  return (
    <Grid container spacing={4}>
      <Grid item md={8} xs={12}>
        <CheckoutForm />
      </Grid>
      <Grid item md={4} xs={12}>
        <Bill enableCheckout={false}/>
      </Grid>
    </Grid>
  );
}

export default checkout;