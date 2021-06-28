import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  totalCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        orders: action.orders.results,
        totalCount: action.orders.count
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
      };
    default: return state;
  }
}

export default reducer;