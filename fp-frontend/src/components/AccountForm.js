import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';

const styles = theme => ({
  signin: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2,
    width: 400,
    height: 300,
  },
  signup: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2,
    width: 400,
    height: 375,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  grid: {
    height: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  loginButton: {
    marginTop: theme.spacing.unit * 2,
  }
});

class AccountForm extends Component {
  state = {
    name: '',
    id: '',
    password: '',
    showPassword: false,
  }

  handleClickSignIn = async () => {
    const { id, password } = this.state;
    
    const success = await this.props.onSignIn(id, password);
    if(!success) {
      this.setState({
        password: ''
      });
    }
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, signInMode } = this.props;
    const { id, name, password, showPassword } = this.state;

    return (
      <Paper className={signInMode ? classes.signin : classes.signup} elevation={1}>
        <Grid
          container
          direction='column' justify='space-around'
          className={classes.grid}
        >
          {signInMode ?
            null : <TextField
              className={classes.textField}
              id="standard-name"
              label="Name"
              value={name}
              onChange={this.handleChange('name')}
            />
          }
          <TextField
            className={classes.textField}
            id="standard-id"
            label="ID"
            value={id}
            onChange={this.handleChange('id')}
          />
          <FormControl className={classes.textField} >
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            className={classes.loginButton}
            variant="contained" size="large" color="primary"
            onClick={signInMode ? this.handleClickSignIn : this.handleClickSignUp}
          >
            {signInMode ? '로그인' : '회원 가입'}
          </Button>
          <Button
            component={Link} to={signInMode ? "/signup" : "/signin"}
            size="small" color="default"
          >
            {signInMode ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          </Button>
        </Grid>
      </Paper>
    );
  }
}

AccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountForm);