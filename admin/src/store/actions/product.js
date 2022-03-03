import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';
import * as services from '../services'
import { openPopup } from './popup';
import history from '../../configs/history';

const fetchProductSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products: products
  }
}

const fetchProductFailed = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILED,
  }
}

const searchProductSuccess = (products) => {
  return {
    type: actionTypes.SEARCH_PRODUCTS_SUCCESS,
    products: products
  }
}

const searchProductFailed = () => {
  return {
    type: actionTypes.SEARCH_PRODUCTS_FAILED,
  }
}

const generateProductSuccess = (product) => {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
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
    type: actionTypes.GET_PRODUCT_SUCCESS,
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
    type: actionTypes.EDIT_PRODUCT_SUCCESS,
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
    let url = `/products/?page=${page}`;
    try {
      let res = await axios.get(url)
      dispatch(fetchProductSuccess(res.data));
    } catch (err) {
      dispatch(fetchProductFailed())
    } 
  };
}

export const searchProducts = (search_text='') => {
  return async dispatch => {
    try {
      let res = await services.searchProducts(search_text)
      dispatch(searchProductSuccess(res.data))
    } catch (err) {
      dispatch(searchProductFailed())
    }
  }
}

export const createProduct = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post('/products/', data);
      dispatch(generateProductSuccess(res.data))
      dispatch(openPopup('CREATE SUCCESSFULL!'))
      history.push('/products')
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
      dispatch(openPopup('CREATE SUCCESSFULL!'))
      history.push('/products')
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