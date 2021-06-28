import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';

const fetchOrder = (orders) => {
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

export const initOrders = (page=1) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/orders/?page=${page}`)
      dispatch(fetchOrder(res.data));
    } catch (err) {
      console.log(err)
      dispatch(fetchOrderFailed())
    }
  }
}
