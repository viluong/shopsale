import axios from '../../configs/axios';

export const searchProducts = (search_text) => {
  let url = '/products/';
  const search = search_text ? search_text.replace(/[^a-zA-Z0-9]/g, " ") : '';
  url = search ? url + `?search=${search}`: url;
  return axios.get(url)
} 