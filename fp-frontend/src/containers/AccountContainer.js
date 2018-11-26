import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({

});

class AccountContainer extends Component {
  render() {
    console.log(`render in homePageContainer`);

    return <div>하하하</div>;
  }
}

AccountContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContainer);