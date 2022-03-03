import axios from '../../configs/axios';

export const editCategory = (id, data) => {
  const url = `/categories/${id}/`;
  return axios.put(url, data);
}

export const getCategory = (id) => {
  const url = `/categories/${id}/`;
  return axios.get(url);
}

export const createCategory = (data) => {
  return axios.post('/categories/', data)
}