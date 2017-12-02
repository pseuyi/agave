import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

class GoogLogin extends Component {

  onLoginSuccess = (response) => {
    console.log('response --- ', response)
    //console.log('login success: ', accessToken, ' --- ', tokenId);
  }

  onLoginFailure = (response) => {
    console.log('response --- ', response)
    // console.log('login failed: ', error, ' --- ', details);
  }

  render() {
    console.log('process: ', process.env.CLIENT_ID);
    return (
      <GoogleLogin
        clientId={process.env.CLIENT_ID}
        buttonText="Login"
        onSuccess={this.onLoginSuccess}
        onFailure={this.onLoginFailure}
        ></GoogleLogin>
    )
  }
}

export default GoogLogin;
