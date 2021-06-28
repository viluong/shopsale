import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  totalCount: 0,
  created: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products.results,
        totalCount: action.products.count
      };
    case actionTypes.FETCH_PRODUCTS_FAILED:
      return {
        ...state,
      };
    case actionTypes.CREATE_PRODUCT:
      return {
        ...state,
        created: true
      }
    default: return state;
  }
}

export default reducer;