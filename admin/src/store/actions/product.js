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

const generateProductSuccess = (product) => {
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

const getProductSuccess = (product) => {
  return {
    type: actionTypes.GET_PRODUCT,
    product: product
  }
}

const getProductFail = () => {
  return {
    type: actionTypes.GET_PRODUCT_FAILED,
  }
}

const editProductSuccess = (product) => {
  return {
    type: actionTypes.EDIT_PRODUCT,
    product: product
  } 
}

const editProductFail = () => {
  return {
    type: actionTypes.EDIT_PRODUCT_FAIL,
  }
}

export const initProducts = (page=1) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/products/?page=${page}`)
      dispatch(fetchProduct(res.data));
    } catch (err) {
      dispatch(fetchProductFailed())
    } 
  }
}

export const createProduct = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post('/products/', data);
      dispatch(generateProductSuccess(res.data))
    } catch (err) {
      dispatch(generateProductFailed())
    }
  }
}

export const editProduct = (id, data) => {
  return async dispatch => {
    try {
      let res = await axios.put(`/products/${id}/`, data)
      dispatch(editProductSuccess(res.data))
    } catch (err) {
      dispatch(editProductFail())
    }
  }
}

export const getProduct = (id) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/products/${id}/`)
      dispatch(getProductSuccess(res.data))
    } catch (err) {
      dispatch(getProductFail())
    }
  }
}