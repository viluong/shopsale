import * as actionTypes from '../actions/actionTypes';

const initialState = {
  carts: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CARTS_SUCCESS:
      return {
        ...state,
        carts: [...action.carts]
      }
    case actionTypes.REMOVE_PRODUCT_CART:
      return {
        ...state,
        carts: state.carts.filter((item) => item.product.id !== action.productId)
      }
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        carts: []
      }
    default: return state
  }
}

export default reducer