import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Skeleton } from "@material-ui/lab";
import classes from './ProductDetailSkeleton.module.css';

const productDetailSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid container justify="center" item xs={12} md={5}>
        <img src='https://product.hstatic.net/1000383440/product/62105201_1821444534666118_5397009136254713856_n_dacf1cbb56554dcca7e569b7edae4f29_master.jpg' 
        alt='' 
        className={classes.imageProductDetail} 
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <h2><Skeleton animation="wave"/></h2>
        <h1 className={classes.productPrice}><Skeleton animation="wave"/></h1>
        <div style={{ whiteSpace: "pre-wrap" }}>
          <h4>Detail</h4>
          <Skeleton animation="wave"/>
          <Skeleton animation="wave"/>
          <Skeleton animation="wave"/>
          <Skeleton animation="wave"/>
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
          >
            -
          </Button>
          <TextField
            size="small"
            variant="outlined"
            value=''
            style={{ width: 175 }}
          />

          <Button
            variant="contained"
            color="primary"

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

export default productDetailSkeleton;