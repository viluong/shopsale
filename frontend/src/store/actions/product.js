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

const getProduct = (product) => {
  return {
    type: actionTypes.GET_PRODUCT,
    product: product
  }

}

const getProductFailed = () => {
  return {
    type: actionTypes.GET_PRODUCT_FAILED,
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

export const getProductDetail = (id) => {
  return (dispatch) => {
    axios.get(`/products/${id}/`).then( res => {
      dispatch(getProduct(res.data))
    }).catch( error => {
      dispatch(getProductFailed())
    })
  }
}