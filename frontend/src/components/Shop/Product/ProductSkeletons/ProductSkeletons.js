import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import ProductSkeleton from './ProductSkeleton/ProductSkeleton';

const productSkeletons = () => {
  let productItems = []
  for (let i = 0; i < 8; i++) {
    productItems.push(
      <Grid item xs={12} sm={4} lg={2} key={i}>
        <ProductSkeleton />
      </Grid>
    )
  }
  return (
    <Grid container spacing={1}>
      {productItems}
    </Grid>
  );
};

export default memo(productSkeletons);