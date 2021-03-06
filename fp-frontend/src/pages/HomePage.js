import React, { Component } from 'react';
import { Header, Wordbook } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, signOutRequest } from 'actions/account';
import { wordbookListRequest } from 'actions/wordbook';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  CssBaseline,
  Snackbar,
  Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  divider: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginRight: theme.spacing.unit,
    width: '100%'
  },
});

class Home extends Component {
  state = {
    openSignOutSnackBar : false,
  }

  handleCloseSignOutSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSignOutSnackBar: false });
  };

  componentDidMount() {
    // get cookie by name
    const getCookie = (name) => {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');

    // if loginData is undefined, do nothing
    if (typeof loginData === "undefined") {
      this.props.history.push(`/signin`);
      return;
    }

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if (!loginData.isLoggedIn) {
      this.props.history.push(`/signin`);
      return;
    }

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
      () => {
        console.log(this.props.status);
        // if session is not valid
        if (!this.props.status.valid) {
          // logout the session
          loginData = {
            isLoggedIn: false,
            id: '',
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
          this.props.history.push(`/signin`);
          // and notify
          // let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
          // Materialize.toast($toastContent, 4000);
        }
      }
    );

    this.props.wordbookListRequest().then(
      () => {
        console.log(this.props.wordbooks);
      }
    );
  }

  handleSignOut = async () => {
    try {
      await this.props.signOutRequest();

      // EMPTIES THE SESSION
      let loginData = {
          isLoggedIn: false,
          username: '',
      };

      document.cookie = 'key=' + btoa(JSON.stringify(loginData));
      this.props.history.push(`/signin`);
    } catch {
      console.log('Logout failed');
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header handleClickHome={this.handleHomeClick} handleSignOut={this.handleSignOut} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container direction='column' alignItems='center' spacing={24}>
            {this.props.wordbooks.map((wordbook, index) => 
              <Grid item key={index} >
                <Wordbook wordbook={wordbook} />
              </Grid>
            )}
          </Grid>
    
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.account.status,
    wordbooks: state.wordbook.list.wordbooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    signOutRequest: () => {
      return dispatch(signOutRequest());
    },
    wordbookListRequest: () => {
      return dispatch(wordbookListRequest());
    }
  };
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home)));