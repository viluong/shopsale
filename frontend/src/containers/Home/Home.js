import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'components/Shop/Carousel/Carousel';
import Pagination from '@material-ui/lab/Pagination';
import Service from 'components/Shop/Service/Service';
import Aux from 'hocs/HightAux/HightAux';
import { useDispatch, useSelector } from 'react-redux';
import Title from 'components/UI/Title/Title';
import ProductCards from 'components/Shop/Product/ProductCards/ProductCards';
import * as actions from 'store/actions/index';
import ProductSkeletons from 'components/Shop/Product/ProductSkeletons/ProductSkeletons';
import { homeSelector } from 'selectors/ProductSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const home = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {products, totalCount} = useSelector(homeSelector);
  const pages = Math.round(totalCount / 6 );
  
  const onInitProducts = useCallback((page = 1) => {
    dispatch(actions.initProducts(page));
  }, [dispatch]);

  useEffect(() => {
    onInitProducts();
  }, [onInitProducts])
  
  const handleChange = (event, value) => {
    setPage(value);
    onInitProducts(value);
  };

  let productsRender = <ProductSkeletons />
  if (products && products.length > 0) {
      productsRender = <ProductCards products={products} />
  }

  return (
      <Aux>
        <Carousel />
        <Service />
        <div className={classes.root}>
            <Title>Suggest for you</Title>
            {productsRender}
            <Pagination count={pages} page={page} onChange={handleChange} className={classes.pagination}/>
        </div>
      </Aux>
  );
}

export default home;