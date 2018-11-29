import React, { Component } from 'react';
import { AccountContainer } from 'containers';
import { connect } from 'react-redux';
import { signUpRequest } from 'actions/account';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  handleSignUp = (name, id, password) => {
    console.log(`${name}, ${id}, ${password}`);
    return this.props.signUpRequest(name, id, password).then(
      () => {
        if(this.props.status === "SUCCESS") {
          const loginData = {
            isLoggedIn: true,
            id,
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          console.log(`GoGo`);
          this.props.history.push(`/`);
          return true;
        } else {
          /*
            ERROR CODES:
              1: BAD ID
              2: BAD PASSWORD
              3: ID EXISTS
          */
          const errorMessage = [
            'Invalid ID',
            'Password is too short',
            'ID already exists'
          ];
          return false;
        }
      }
    );
  }

  render() {
    return (
      <AccountContainer signInMode={false} onSignUp={this.handleSignUp} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.account.register.status,
    errorCode: state.account.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpRequest: (name, id, pw) => {
      return dispatch(signUpRequest(name, id, pw));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);