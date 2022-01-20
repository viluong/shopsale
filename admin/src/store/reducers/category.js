import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categories: [],
  totalCount: 0,
  category: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories.results,
        totalCount: action.categories.count
      };
    case actionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
      };
    case actionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.category
      }
    case actionTypes.GET_CATEGORY_FAILED:
      return {
        ...state
      }
    case actionTypes.EDIT_CATEGORY_SUCCESS:
      return {
        ...state
      }
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.category
      }
    case actionTypes.CREATE_CATEGORY_FAILED:
      return {
        ...state,
      }
    default: return state;
  }
}

export default reducer;