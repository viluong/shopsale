import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categories: [],
  totalCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories.results,
        totalCount: action.categories.count
      };
    case actionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
      };
    default: return state;
  }
}

export default reducer;