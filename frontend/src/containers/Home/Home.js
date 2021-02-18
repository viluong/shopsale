import React, { useEffect, useCallback } from 'react';
import Carousel from 'components/Shop/Carousel/Carousel';
import Service from 'components/Shop/Service/Service';
import Aux from 'hocs/HightAux/HightAux';
import { useDispatch, useSelector } from 'react-redux';
import Title from 'components/UI/Title/Title';
import ProductCards from 'components/Shop/Product/ProductCards/ProductCards';
import * as actions from 'store/actions/index';
import ProductSkeletons from 'components/Shop/Product/ProductSkeletons/ProductSkeletons';

const home = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);

  const onInitProducts = useCallback(() => {
      dispatch(actions.initProducts());
  }, [dispatch]);

  useEffect(() => {
      onInitProducts();
  }, [onInitProducts])

  let productsRender = <ProductSkeletons />
  if (products.length > 0) {
      productsRender = <ProductCards products={products} />
  }

  return (
      <Aux>
        <Carousel />
        <Service />
        <div>
            <Title>Suggest for you</Title>
            {productsRender}
        </div>
      </Aux>
  );
}

export default home;