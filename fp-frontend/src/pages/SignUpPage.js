import React, { Component } from 'react';
import { AccountContainer } from 'containers';
import { connect } from 'react-redux';
import { signUpRequest, getStatusRequest } from 'actions/account';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
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
    accountStatus: state.account.status,
    status: state.account.register.status,
    errorCode: state.account.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpRequest: (name, id, pw) => {
      return dispatch(signUpRequest(name, id, pw));
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));