import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  totalCount: 0,
  popup: false,
  popupMessage: ''
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
        popup: true,
        popupMessage: 'CREATE SUCCESSFUL!'
      }
    case actionTypes.GET_PRODUCT:
      return {
        ...state,
        product: action.product
      }
    case actionTypes.GET_PRODUCT_FAILED:
      return {
        ...state
      }
    case actionTypes.EDIT_PRODUCT:
      return {
        ...state,
        popup: true,
        popupMessage: 'EDIT SUCCESSFUL!'

      }
    case actionTypes.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products.results,
        totalCount: action.products.count
      }
    case actionTypes.SEARCH_PRODUCTS_FAILED:
      return {
        ...state,
      }
    default: return state;
  }
}

export default reducer;