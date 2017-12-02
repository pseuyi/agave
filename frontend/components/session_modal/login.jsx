import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {

  onLoginSuccess = ({ accessToken, tokenId }) => {
    console.log('login success: ', accessToken, ' --- ', tokenId);
  }

  onLoginFailure = ({ error, details }) => {
    conosle.log('login failed: ', error, ' --- ', details);
  }

  return (
    <GoogleLogin
      clientId={process.env.CLIENT_ID}
      buttonText="Login"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
    />
  )
}

export default Login;
