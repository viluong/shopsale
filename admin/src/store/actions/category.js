import axios from '../../configs/axios';
import * as actionTypes from './actionTypes';
import * as services from '../services';
import { openPopup } from './popup';
import history from '../../configs/history';

const fetchCategory = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories: categories
  }
}

const fetchCategoryFailed = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILED,
  }
}

const getCategorySuccess = (category) => {
  return {
    type: actionTypes.GET_CATEGORY_SUCCESS,
    category: category
  }
}

const getCategoryFailed = () => {
  return {
    type: actionTypes.GET_CATEGORY_FAILED
  }
} 

const editCategorySuccess = (category) => {
  return {
    type: actionTypes.EDIT_CATEGORY_SUCCESS,
    category: category
  }
}

const createCategorySuccess = (category) => {
  return {
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
    category: category
  }
}

const createCategoryFailed = () => {
  return {
    type: actionTypes.CREATE_CATEGORY_FAILED
  }
}

const editCategoryFailed = () => {
  return {
    type: actionTypes.EDIT_CATEGORY_FAILED
  }
}

export const getCategories = (page=1) => {
  return async dispatch => {
    try {
      let res = await axios.get(`/categories/?page=${page}`)
      dispatch(fetchCategory(res.data));
    } catch (err) {
      dispatch(fetchCategoryFailed())
    }
  }
}

export const editCategory = (id, data) => {
  return async dispatch => {
    try {
      const res = await services.editCategory(id, data);
      dispatch(editCategorySuccess(res.data))
      dispatch(openPopup('EDIT SUCCESSFULL!'))
      history.push('/categories')
    } catch (err) {
      dispatch(editCategoryFailed())
    }  
  }
}

export const getCategory = id => {
  return async dispatch => {
    try {
      const res = await services.getCategory(id)
      dispatch(getCategorySuccess(res.data))
    } catch (err) {
      dispatch(getCategoryFailed())
    }
  }
}

export const createCategory = (data) => {
  return async dispatch => {
    try {
      const res = await services.createCategory(data)
      dispatch(createCategorySuccess(res.data))
      dispatch(openPopup('CREATE SUCCESSFULL!'))
      history.push('/categories')
    } catch (err) {
      dispatch(createCategoryFailed())
    }
  }
}