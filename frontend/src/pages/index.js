import React from 'react';
import withErrorHandler from '../hocs/withErrorHandler/withErrorHandler';
import axios from '../configs/axios';
import Carousel from '../components/Shop/Carousel/Carousel';
import Service from '../components/Shop/Service/Service';
import Aux from 'hocs/Aux/Aux';
import ProductHome from '../containers/Product/ProductHome/ProductHome';

const home = () => {
  return (
    <Aux>
      <Carousel />
      <Service />
      <ProductHome />
    </Aux>
  );
}

export default withErrorHandler(home, axios);