import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

class GoogLogin extends Component {

  onLoginSuccess = ({ accessToken, tokenId }) => {
    const authData = {
      access_token: accessToken,
      id_token: tokenId,
    }
    this.props.login(authData);
  }

  onLoginFailure = (response) => {
    console.log('login failed', response)
  }

  render() {
    return (
      <GoogleLogin
        className='google-login-button'
        clientId={process.env.CLIENT_ID}
        buttonText="Login"
        onSuccess={this.onLoginSuccess}
        onFailure={this.onLoginFailure}
        >login with google</GoogleLogin>
    )
  }
}

export default GoogLogin;
