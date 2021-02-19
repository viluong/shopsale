import axios from '../../configs/axios';
import cookie from 'react-cookies'

import * as actionTypes from './actionTypes';

export const openSignInModal = () => {
  return {
    type: actionTypes.OPEN_SIGN_IN_MODAL
  }
}

export const openSignUpModal = () => {
  return {
    type: actionTypes.OPEN_SIGN_UP_MODAL
  }
}

export const closeSignInModal = () => {
  return {
    type: actionTypes.CLOSE_SIGN_IN_MODAL
  }
}

export const closeSignUpModal = () => {
  return {
    type: actionTypes.CLOSE_SIGN_UP_MODAL
  }
}

export const userRegisterSuccess = (data) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    user: data
  }
} 

export const userRegisterFailed = () => {
  return {
    type: actionTypes.REGISTER_USER_FAILED,
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, refresh_token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    refresh_token: refresh_token
  }
}

export const authFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED,
  }
}

export const getUserProfile = (user) => {
  return {
    type: actionTypes.GET_USER_PROFILE,
    user: user
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const registerUser = (values) => {
  
  return (dispatch) => {  
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    }
    axios.post('/auth/registration', data).then( res => {
      dispatch(userRegisterSuccess(res.data))
      dispatch(openSignInModal())
    }).catch(error => {
      dispatch(userRegisterFailed())
    })
  }
}

export const loginUser = (values) => {

  return (dispatch) => {
    const data = {
      email: values.email,
      password: values.password
    }
    dispatch(authStart())
    axios.post('/auth/token', data).then( res => {
      cookie.save('token', res.data.access, {
        path: '/',
        maxAge: res.data.expires_in
      })
      cookie.save('refresh_token', res.data.refresh, {
        path: '/',
        maxAge: res.data.expires_in
      })
      dispatch(authSuccess(res.data.access, res.data.refresh));
      dispatch(getUserProfile(res.data.user));
    }).catch(error => {
      dispatch(authFailed());
    })
  }
}

export const loginWithGoogle = (access_token) => {
  const data = {
    token: access_token
  }
  return (dispatch) => {
    axios.post('/auth/google', data).then( res => {
      cookie.save('token', res.data.access, {
        path: '/',
        maxAge: res.data.expires_in
      })
      cookie.save('refresh_token', res.data.refresh, {
        path: '/',
        maxAge: res.data.expires_in
      })
      dispatch(authSuccess(res.data.access, res.data.refresh));
      dispatch(getUserProfile(res.data.user));
    }).catch(error => {
      dispatch(authFailed());
    })
  }
}

export const checkAuth = () => {
  return (dispatch) => {
    const token = cookie.load('token');
    const refresh_token = cookie.load('refresh_token');
    if (token) {
      dispatch(authSuccess(token, refresh_token));
    }
  }
  
}

export const initUserProfile = () => {
  return (dispatch) => {
    const token = cookie.load('token');
    if (token) {
      axios.get('/auth/profile').then(res => {
        dispatch(getUserProfile(res.data))
      }).catch(error => {
        cookie.remove('token', {
          path: '/'
        })
        cookie.remove('refresh_token', {
          path: '/'
        })
        dispatch(authFailed())
      })
    }
  }
}

export const onLogOut = () => {
  return (dispatch) => {
    const data = {
      refresh_token: cookie.load('refresh_token')
    }
    axios.post('/auth/logout', data).then(res => {
      cookie.remove('token', {
        path: '/'
      })
      cookie.remove('refresh_token', {
        path: '/'
      })
      dispatch(logout())
    })
  }
}
