import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';

const fetchProduct = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
    products: products
  }
}

const fetchProductFailed = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILED,
    error: error
  }
}

const getProduct = (product) => {
  return {
    type: actionTypes.GET_PRODUCT,
    product: product
  }

}

const getProductFailed = (error) => {
  return {
    type: actionTypes.GET_PRODUCT_FAILED,
    error: error
  }
}

export const initProducts = () => {
  return (dispatch) => {
    axios.get('/products/').then( res => {
      dispatch(fetchProduct(res.data));
    }).catch( error => {
      dispatch(fetchProductFailed(error.message))
    })
  }
}

export const getProductDetail = (id) => {
  return (dispatch) => {
    axios.get(`/products/${id}/`).then( res => {
      dispatch(getProduct(res.data))
    }).catch( error => {
      dispatch(getProductFailed(error.message))
    })
  }
}