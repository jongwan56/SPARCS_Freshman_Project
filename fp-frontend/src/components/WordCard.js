import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
  Typography,
  IconButton,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Collapse,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';
import { VolumeUp as VolumeUpIcon, } from '@material-ui/icons';
import { WordbookChapter } from 'components'

const styles = theme => ({
    card: {
      width: 800,
    },
    wordCard: {
      height: 80,
      padding: 0,
    },
    wordbookImg: {
      height: 180,
      padding: theme.spacing.unit,
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    wordbookContent: {
      height: 180,
      // padding: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    wordbookPercent: {
      height: 180,
      paddingRight: theme.spacing.unit * 4,
    },
    chapters: {
      paddingTop: 0,
      paddingBottom: 200,
    },
    chaptersList: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    wordCardItem: {
      height: '100%'
    }
    // avatar: {
    //   backgroundColor: red[500],
    // },
  });

class WordCard extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, handleClickHome, handleSignOut, mode } = this.props;
    return (
      <Card className={classes.card}>
        
          <Grid container className={classes.wordCard} >
            <Grid item xs={4} >
              <Grid container justify='center' alignItems='center' className={classes.wordCardItem}>
                <Typography variant='body1'>
                  {'save [seIv]'}
                </Typography>
                <IconButton >
                  <VolumeUpIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container justify='center' alignItems='center' className={classes.wordCardItem}>
                <Typography variant='body1'>
                  저장하다.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='center' alignItems='center' className={classes.wordCardItem}>
                <Typography variant='body1'>
                  확인
                </Typography>
              </Grid>
            </Grid>
          </Grid>

      </Card>
    );
  }

}

WordCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WordCard);
