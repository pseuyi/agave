import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { login } from 'actions/session_actions';

class GoogLogin extends Component {

  onLoginSuccess = ({ accessToken, tokenId }) => {
    console.log('login success')
    const authData = {
      access_token: accessToken,
      id_token: tokenId,
    }
    // this.props.login(authData);
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
