import axios from '../../configs/axios';

export const editOrder = (id, data) => {
  const url = `/orders/${id}/`;
  return axios.put(url, data);
}

export const createOrder = (data) => {
  const url = '/orders/';
  return axios.post(url, data);
}

export const getOrder = (id) => {
  return axios.get(`/orders/${id}/`)
}

export const fetchOrders = (page=1) => {
  return axios.get(`/orders/?page=${page}`)
}