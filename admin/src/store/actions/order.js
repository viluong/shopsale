import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';

const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS,
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
    type: actionTypes.GET_ORDER,
    order: order
  }
}

const getOrderFailed = () => {
  return {
    type: actionTypes.GET_ORDER_FAILED,
  }
}

export const fetchOrders = (page=1) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/orders/?page=${page}`)
      dispatch(fetchOrderSuccess(res.data));
    } catch (err) {
      console.log(err)
      dispatch(fetchOrderFailed())
    }
  }
}

export const getOrder = (id) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/orders/${id}/`)
      dispatch(getOrderSuccess(res.data))
    } catch (err) {
      dispatch(getOrderFailed())
    }
  }
}