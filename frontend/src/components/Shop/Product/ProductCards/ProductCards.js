import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard/ProductCard';

const productCards = (props) => {
  const { products } = props;
  
  const productItems = products.map((item, index) => {
    return (      
      <Grid item xs={12} sm={4} lg={2} key={index}>
        <ProductCard product={item} />
      </Grid>)
  })
   
  return (
    <Grid container spacing={1}>
      {productItems}
    </Grid>
  );
};

export default memo(productCards, 
  (prevProps, nextProps) =>
    prevProps.products === nextProps.products
)