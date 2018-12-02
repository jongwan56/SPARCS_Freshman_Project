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
  LinearProgress,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, } from '@material-ui/icons';

const styles = theme => ({
    card: {
      width: 800,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    wordbook: {
      height: 150,
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
    chapter: {
      height: 100,
    },
    chapterName: {
      height: 100,
    },
    chapterDescription: {
      height: 100,
      paddingRight: theme.spacing.unit * 2,
    },
    chapterProgress: {
      height: 100,

    }
    // avatar: {
    //   backgroundColor: red[500],
    // },
  });

class WordbookChapter extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <ListItem button>
        <Grid container alignItems='center' className={classes.chapter} spacing={16}>
          <Grid item xs={2} >
            <Grid container justify='flex-start' alignItems='center' className={classes.chapterName} >
              <Typography variant='h4'>
                {`Day1`}
              </Typography>
            </Grid>
          </Grid>
          <div style={{
            border: 'solid #ff0000',
            height: '100%'
            }}>
          </div>
          <Grid item xs={6} >
            <Grid container justify='flex-start' alignItems='center' className={classes.chapterDescription} >
              <Typography variant='body1'>
                {`첫번째 날, A로 시작하는 단어^^ 첫번째 날, A로 시작하는 단어^^ 첫번째 날, A로 시작하는 단어^^`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Grid container direction='column' justify='space-evenly' className={classes.chapterProgress} >
              <Grid container alignItems='center' >
                <Grid item xs={3}>
                  <Typography>
                    Learn
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <LinearProgress variant="determinate" value={50} />
                </Grid>
              </Grid>
              <Grid container alignItems='center' >
                <Grid item xs={3}>
                  <Typography>
                    Test
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <LinearProgress variant="determinate" value={50} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    );
  }

}

WordbookChapter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WordbookChapter);
