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

const generateProduct = (product) => {
  return {
    type: actionTypes.CREATE_PRODUCT,
    product: product
  }
}

const generateProductFailed = () => {
  return {
    type: actionTypes.CREATE_PRODUCT_FAILED
  }
}

export const initProducts = (page=1) => {
  return async dispatch => {
    try {
      let res = axios.get(`/products/?page=${page}`);
      dispatch(fetchProduct(res.data));
    } catch (err) {
      dispatch(fetchProductFailed())
    }
    
  }
}

export const createProduct = (data) => {
  return async dispatch => {
    try {
      let res = axios.post('/products/', data);
      dispatch(generateProduct(res.data))
    } catch (err) {
      dispatch(generateProductFailed())
    }
  }
}