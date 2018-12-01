import React, { Component } from 'react';
import { AccountContainer } from 'containers';
import { connect } from 'react-redux';
import { signInRequest, getStatusRequest } from 'actions/account';
import { withRouter } from 'react-router-dom';

class SignIn extends Component {
  componentDidMount() {
    // get cookie by name
    const getCookie = (name) => {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');
    console.log(loginData);

    // if loginData is undefined, do nothing
    if (typeof loginData === "undefined") {
      return;
    }

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if (!loginData.isLoggedIn) {
      console.log('Not logged in')
      return;
    }

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
      () => {
        console.log(this.props.accountStatus);
        // if session is not valid
        if (!this.props.accountStatus.valid) {
          // logout the session
          loginData = {
            isLoggedIn: false,
            id: '',
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
          return;
          // and notify
          // let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
          // Materialize.toast($toastContent, 4000);
        }
        this.props.history.push(`/`);
      }
    );
  }

  handleSignIn = (id, pw) => {
    return this.props.signInRequest(id, pw).then(
      () => {
        if(this.props.status === "SUCCESS") {
          // create session data
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
              1: SIGNIN FAILED
              2: ID NOT FOUND
              3: PASSWORD MISMATCH
          */

          const errorMessage = [
            'Error',
            'ID doesn\'t exists',
            'Wrong Password',
          ];
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
    status: state.account.login.status,
    accountStatus: state.account.status,
    errorCode: state.account.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInRequest: (id, pw) => { 
      return dispatch(signInRequest(id, pw)); 
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));