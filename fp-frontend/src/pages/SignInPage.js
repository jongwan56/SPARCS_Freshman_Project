import React, { Component } from 'react';
import { AccountContainer } from 'containers';
import { connect } from 'react-redux';
import { signInRequest } from 'actions/account';
import { withRouter } from 'react-router-dom';

class SignIn extends Component {
  handleSignIn = (id, pw) => {
    const { signInRequest, history } = this.props;
    return signInRequest(id, pw).then(
      () => {
        if(this.props.status === "SUCCESS") {
          // create session data
          const loginData = {
            isLoggedIn: true,
            id,
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          console.log(`GoGo`);
          history.push(`/`);
          return true;
        } else {
          return false;
        }
      }
    );
  }

  render() {
    return (
      <AccountContainer signInMode={true} onSignIn={this.handleSignIn} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.account.login.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInRequest: (id, pw) => { 
      return dispatch(signInRequest(id, pw)); 
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));