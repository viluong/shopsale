import React from 'react';
import { useRouter } from 'next/router'

import ProductDetail from '../../containers/Product/ProductDetail/ProductDetail';

const product = () => {
  const router = useRouter()
  const { id } = router.query
  let productRender = null
  if (id) {
    productRender = <ProductDetail productId={id} /> 
  }
  return productRender
}

export default product