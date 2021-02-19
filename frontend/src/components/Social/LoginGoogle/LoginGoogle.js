import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions/index';

const clientId = '938032649363-ofpmjfckphqccbanptjhadh848rag1ip.apps.googleusercontent.com';

const loginGoogle = () => {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    console.log("success", res)
    dispatch(actions.loginWithGoogle(res.accessToken))
  };

  const onFailure = (res) => {
    console.log("fail", res)
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '100px' }}
      isSignedIn={false}
    />
  )
}

export default loginGoogle;