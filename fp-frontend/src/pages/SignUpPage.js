import React, { Component } from 'react';
import { AccountContainer } from 'containers';

class SignUp extends Component {
  render() {
    return (
      <AccountContainer signInMode={false} />
    );
  }
}

export default SignUp;