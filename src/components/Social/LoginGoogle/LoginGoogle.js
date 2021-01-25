import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '938032649363-ofpmjfckphqccbanptjhadh848rag1ip.apps.googleusercontent.com';

const loginGoogle = () => {
  const onSuccess = (res) => {
    console.log("success", res)
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