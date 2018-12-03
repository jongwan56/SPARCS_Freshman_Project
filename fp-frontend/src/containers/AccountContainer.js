import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AccountForm } from 'components';

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    background: '#BBBBBB',
  }
});

class AccountContainer extends Component {
  render() {
    const { classes, signInMode, onSignIn, onSignUp } = this.props;
    
    return (
      <Grid
        container
        className={classes.root}
        direction='column'
        alignItems='center'
        justify='center'
      >
        <AccountForm signInMode={signInMode} onSignIn={onSignIn} onSignUp={onSignUp} />
      </Grid>
    );
  }
}

AccountContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContainer);