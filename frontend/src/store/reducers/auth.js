import * as actionTypes from '../actions/actionTypes';

const initialState = {
  openSignUp: false,
  openSignIn: false,
  user: null,
  error: null,
  loading: false,
  token: null,
  refresh_token: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_SIGN_IN_MODAL:
      return {
        ...state,
        openSignIn: true,
      }
    case actionTypes.OPEN_SIGN_UP_MODAL:
      return {
        ...state,
        openSignUp: true,
      }
    case actionTypes.CLOSE_SIGN_IN_MODAL:
      return {
        ...state,
        openSignIn: false
      }
    case actionTypes.CLOSE_SIGN_UP_MODAL:
      return {
        ...state,
        openSignUp: false
      }
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        openSignIn: true,
      }
    case actionTypes.REGISTER_USER_FAILED:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        refresh_token: action.refresh_token
      }
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.GET_USER_PROFILE:
      return {
        ...state,
        user: action.user
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        refresh_token: null
      }
    default: return state
  }
}

export default reducer