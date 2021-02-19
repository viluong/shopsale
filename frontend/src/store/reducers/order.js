import * as actionTypes from '../actions/actionTypes';

const initialState = {
  address: null,
  loading: false,
  orderId: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case actionTypes.SAVE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SAVE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderName: action.orderName
      }
    case actionTypes.SAVE_ORDER_FAILED:
      return {
        ...state,
        loading: false
      }
    default: return state
  }
}

export default reducer