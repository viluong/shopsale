import * as actionTypes from '../actions/actionTypes';

const initialState = {
  popup: false,
  message: '',
  redirect: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_POPUP_SUCCESS:
      return {
        ...state,
        popup: true,
        message: action.message,
      }
    case actionTypes.CLOSE_POPUP_SUCCESS:
      return {
        ...state,
        popup: false,
        message: '',
        redirect: null
      }
    default: return state;
  }
}

export default reducer