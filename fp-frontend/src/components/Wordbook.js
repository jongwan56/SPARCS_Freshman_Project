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
    // avatar: {
    //   backgroundColor: red[500],
    // },
  });

class Wordbook extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, handleClickHome, handleSignOut, mode } = this.props;
    return (
      <Card className={classes.card}>
        {/* <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        /> */}
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
        <CardContent className={classes.wordbook} >
          <Grid container direction='row' justify='space-between' alignItems='flex-start'>
            <Grid item xs={3}>
              <Grid container justify='flex-start' alignItems='center' className={classes.wordbookImg}>
                <img src={'http://read-and-play.eu/images/stories/virtuemart/product/lift-flap-word-book.jpg'}
                  alt={'haha'}
                  className={classes.image}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction='column' justify='space-between' className={classes.wordbookContent} >
                <Grid item >
                  <Typography variant='h4' >
                    {`영단어 마스터`}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant='body1' >
                    {`좋은 단어장입니다.`}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography>
                    {`총 2000단어, 40일 코스`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='flex-end' alignItems='center' className={classes.wordbookPercent}>
                <Typography variant='h2'>
                  {`50%`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing={true} >
          <IconButton
            className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                      })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              <ListItem>1</ListItem>
              <ListItem>2</ListItem>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

}

Wordbook.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wordbook);
