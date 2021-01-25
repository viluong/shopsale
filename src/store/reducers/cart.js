import * as actionTypes from '../actions/actionTypes';

const initialState = {
  carts: [],
  address: null,
  step: null,
  isNext: false
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
    case actionTypes.LOAD_ADDRESS:
      return {
        ...state,
        address: action.address
      }
    case actionTypes.SET_ALLOW_NEXT_STEP:
      return {
        ...state,
        isNext: action.isNext
      }
    default: return state
  }
}

export default reducer