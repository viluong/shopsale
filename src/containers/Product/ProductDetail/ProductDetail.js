import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField } from '@material-ui/core';
import * as actions from '../../../store/actions/index';

import classes from './ProductDetail.module.css';
import ProductDetailSkeleton from 'components/Shop/Product/ProductDetailSkeleton/ProductDetailSkeleton';

const productDetail = (props) => {
  console.log("productDetail")
  const { productId } = props
  const [ quantity, setQuantity ] = useState(0);

  const dispatch = useDispatch()

  const onGetProductDetail = useCallback((productId) => {
    dispatch(actions.getProductDetail(productId))
  }, [dispatch]);

  useEffect(() => {
    onGetProductDetail(productId)
  }, [onGetProductDetail, productId]);

  const onAddQuantityProduct = () => {
    setQuantity(quantity + 1);
  }

  const onRemoveQuantityProduct = () => {
    if (quantity > 0) { 
      setQuantity(quantity - 1);
    }
  }
  
  const product = useSelector(state => state.product.product);

  let productDisplay = <ProductDetailSkeleton />

  if (product) {
    productDisplay = (
      <Grid container spacing={2}>
        <Grid container justify="center" item xs={12} md={5}>
          <img src={product.image} 
          alt={product.name} 
          className={classes.imageProductDetail} 
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <h2>{product.name}</h2>
          <h1 className={classes.productPrice}>{product.price}</h1>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <h4>Detail</h4>
            {product.description}
          </div>
          <h4>
            Delivery:
            <span style={{ marginLeft: 10, marginRight: 10 }}>
              <img
                alt="free shipping"
                src="/9d21899f3344277e34d40bfc08f60bc7.png"
                style={{ height: 20 }}
              />
            </span>
            Free Delivery
          </h4>
          <div style={{ display: "flex", marginBottom: 20 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onRemoveQuantityProduct}
            >
              -
            </Button>
            <TextField
              size="small"
              variant="outlined"
              value={quantity}
              style={{ width: 175 }}
            />
  
            <Button
              variant="contained"
              color="primary"
              onClick={onAddQuantityProduct}
            >
              +
            </Button>
          </div>
  
          <br />
          <div>
            <Button
              variant="outlined"
              color="primary"
            >
              Add Cart
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }

  return productDisplay
}

export default productDetail;