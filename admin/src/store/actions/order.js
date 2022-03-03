import * as actionTypes from './actionTypes';
import * as services from '../services';
import { openPopup } from './popup';
import history from '../../configs/history';

const createOrderSuccess = (order) => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    order: order
  }
}

const createOrderFailed = () => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
  }
}

const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

const fetchOrderFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
  }
}

const getOrderSuccess = (order) => {
  return {
    type: actionTypes.GET_ORDER_SUCCESS,
    order: order
  }
}

const getOrderFailed = () => {
  return {
    type: actionTypes.GET_ORDER_FAILED,
  }
}

const editOrderSuccess = (order) => {
  return {
    type: actionTypes.EDIT_ORDER_SUCCESS,
    order: order
  }
}

const editOrderFailed = () => {
  return {
    type: actionTypes.EDIT_ORDER_FAILED
  }
}

export const fetchOrders = (page=1) => {
  return async dispatch => {
    try {
      const res = await services.fetchOrders(page)
      dispatch(fetchOrderSuccess(res.data));
    } catch (err) {
      dispatch(fetchOrderFailed())
    }
  }
}

export const getOrder = (id) => {
  return async dispatch => {
    try {
      const res = await services.getOrder(id)
      dispatch(getOrderSuccess(res.data))
    } catch (err) {
      dispatch(getOrderFailed())
    }
  }
}

export const editOrder = (id, data) => {
  return async dispatch => {
    try {
      const res = await services.editOrder(id, data);
      dispatch(editOrderSuccess(res.data))
      dispatch(openPopup('EDIT SUCCESSFULL!'))
      history.push('/orders')
    } catch (err) {
      dispatch(editOrderFailed())
    }  
  }
}

export const createOrder = (data) => {
  return async dispatch => {
    try {
      const res = await services.createOrder(data);
      dispatch(createOrderSuccess(res.data))
      dispatch(openPopup('Create SUCCESSFULL!'))
      history.push('/orders')
    } catch (err) {
      dispatch(createOrderFailed())
    }
  }
}