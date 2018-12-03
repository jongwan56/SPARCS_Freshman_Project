import React, { Component } from 'react';
import { Header, Wordbook, WordCard } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, signOutRequest } from 'actions/account';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  CssBaseline,
  Snackbar,
  Grid,
  Typography,
  IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import {
  FilterList as FilterIcon,
} from '@material-ui/icons'
import axios from 'axios'; 

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
  index: {
    width: 1000,
    height: 50,
  },
  indexItem: {
    height: '100%'
  }
});

class Chapter extends Component {
  state = {
    openSignOutSnackBar : false,
    chapterName: '',
    words: [],
  }

  handleCloseSingOutSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSignOutSnackBar: false });
  };

  componentDidMount = async () => {
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
    let chapter = await axios.get(`/api/wordbook/chapter/${this.props.match.params.chapterId}`);
    chapter = chapter.data.chapter;
    const words = [];
    for (let i=0; i<chapter.words.length; i++) {
      const word = await axios.get(`/api/wordbook/word/${chapter.words[i]}`);
      // console.log(word.data.check);
      const newWord = word.data.word;
      newWord.check = word.data.check;
      console.log(newWord);
      words.push(newWord);
    }
    this.setState({ chapterName: chapter.name, words })
    console.log(chapter);
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
    /* Check whether current route is login or register using regex */
    // let re = /(login|register)/;
    // let isAuth = re.test(this.props.location.pathname);
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header handleClickHome={this.handleHomeClick} handleSignOut={this.handleSignOut} name={this.state.chapterName} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container direction='column' alignItems='center' spacing={8}>
            <Grid item >
              <Grid container className={classes.index} justify='space-between' >
                <Grid item xs={4} >
                  <Grid container justify='center' alignItems='center' className={classes.indexItem}>
                    <Typography variant='body1'>
                      단어
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item >
                  <Grid container justify='center' alignItems='center' className={classes.indexItem}>
                    <div style={{
                      border: '0.5px dashed #CCCCCC',
                      height: '80%'
                      }}>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container justify='center' alignItems='center' className={classes.indexItem}>
                    <Typography variant='body1'>
                      뜻
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item >
                  <Grid container justify='center' alignItems='center' className={classes.indexItem}>
                    <div style={{
                      border: '0.5px dashed #CCCCCC',
                      height: '80%'
                      }}>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid container justify='center' alignItems='center' className={classes.indexItem}>
                    <Typography variant='body1'>
                      &nbsp; &nbsp;확인
                    </Typography>
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {this.state.words.map((word, index) => (
              <Grid item key={index} >
                <WordCard word={word} />
              </Grid>
            ))}
          </Grid>
          {/* <Dialog
            open={Boolean(this.state.openAskSave)}
            onClose={this.handleAskSaveClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              저장하지 않은 데이터가 있어유
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                그냥 넘어가면 다 없어져유
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAskSaveClose} color="primary" autoFocus>
                취소
              </Button>
              <Button onClick={this.handleAskSaveNo} color="primary">
                저장하지 않고 진행
              </Button>
              <Button onClick={this.handleAskSaveYes} color="primary" autoFocus>
                저장하고 진행
              </Button>
            </DialogActions>
          </Dialog> */}
        </main>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSignOutSnackBar}
          autoHideDuration={3000}
          onClose={this.handleCloseSingOutSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">로그아웃 되었습니다.</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //   UNDO
            // </Button>,
            // <IconButton
            //   key="close"
            //   aria-label="Close"
            //   color="inherit"
            //   className={classes.close}
            //   onClick={this.handleClose}
            // >
            //   <CloseIcon />
            // </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.account.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    signOutRequest: () => {
      return dispatch(signOutRequest());
    }
  };
};

Chapter.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chapter)));
