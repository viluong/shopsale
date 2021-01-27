import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../../components/UI/Title/Title';
import ProductCards from '../../../components/Shop/Product/ProductCards/ProductCards';
import * as actions from '../../../store/actions/index';
import ProductSkeletons from '../../../components/Shop/Product/ProductSkeletons/ProductSkeletons';

const productHome = () => {
  const dispatch = useDispatch();
  
  const products = useSelector(state => state.product.products);
  
  const totalProducts = useSelector(state => state.product.totalCount);

  const onInitProducts = useCallback(() => {
    dispatch(actions.initProducts());
  }, [dispatch]);

  useEffect(() => {
    onInitProducts();
  }, [onInitProducts])

  let productsRender = <ProductSkeletons />
  if (products && totalProducts) {
    productsRender = <ProductCards products={products} totalCount={totalProducts}/>
  }

  return (
    <div>
      <Title>Suggest for you</Title>
      {productsRender}
    </div>
  );
}

export default productHome;