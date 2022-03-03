import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  totalCount: 0,
  order: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders.results,
        totalCount: action.orders.count
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
      };
    case actionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order
      }
    case actionTypes.GET_ORDER_FAILED:
      return {
        ...state,
      }
    case actionTypes.EDIT_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order,
      }
    case actionTypes.EDIT_ORDER_FAILED:
      return {
        ...state
      }
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order,
      }
    case actionTypes.CREATE_ORDER_FAILED:
      return {
        ...state
      }
    default: return state;
  }
}

export default reducer;