import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';

const fetchCategory = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES,
    categories: categories
  }
}

const fetchCategoryFailed = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILED,
  }
}

export const getCategories = () => {
  return async dispatch => {
    try {
      let res = await axios.get(`/categories/`)
      dispatch(fetchCategory(res.data));
    } catch (err) {
      dispatch(fetchCategoryFailed())
    }
  }
}
