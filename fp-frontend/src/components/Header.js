import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core';
import { Home as HomeIcon, } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles = theme => ({
  // button: {
  //   marginLeft: theme.spacing.unit,
  // }
  homeIcon: {
    marginRight: theme.spacing.unit,
  },
});

const Header = ({ classes, handleSignOut, name }) => (
  <AppBar position="fixed" >
    <Toolbar>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={6}>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Go Home"
                component={Link}
		to='/'
                className={classes.homeIcon}
              >
                <HomeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit" >
                {name || 'SPARCS Word Master'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end" alignItems="center">
            <Button color="inherit" onClick={handleSignOut}>
              LOG OUT
              {/* <SaveIcon className={classes.rightIcon} /> */}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
