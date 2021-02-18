import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  error: null,
  totalCount: 0,
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
        error: action.error
      };
    case actionTypes.GET_PRODUCT:
      return {
        ...state,
        product: action.product
      }
    case actionTypes.GET_PRODUCT_FAILED:
      return {
        ...state,
        error: action.error
      }
    default: return state;
  }
}

export default reducer;