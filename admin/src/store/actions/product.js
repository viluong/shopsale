import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';

const fetchProduct = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
    products: products
  }
}

const fetchProductFailed = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILED,
  }
}

export const initProducts = (page=1) => {
  return (dispatch) => {
    axios.get(`/products/?page=${page}`).then( res => {
      dispatch(fetchProduct(res.data));
    }).catch( error => {
      dispatch(fetchProductFailed())
    })
  }
}
