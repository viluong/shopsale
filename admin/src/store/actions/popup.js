import * as actionTypes from './actionTypes';

export const openPopupSuccess = (message) => {
  return {
    type: actionTypes.OPEN_POPUP_SUCCESS,
    message: message,
  }
}

export const closePopupSuccess = () => {
  return {
    type: actionTypes.CLOSE_POPUP_SUCCESS
  }
}

export const closePopup = () => {
  return dispatch => {
    dispatch(closePopupSuccess())
  }
}

export const openPopup = (message) => {
  return dispatch => {
    dispatch(openPopupSuccess(message))
  }
}