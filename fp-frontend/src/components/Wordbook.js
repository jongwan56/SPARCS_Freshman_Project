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
import { ExpandMore as ExpandMoreIcon, } from '@material-ui/icons';
import { WordbookChapter } from 'components'

const styles = theme => ({
    card: {
      width: 800,
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
    chapters: {
      paddingTop: 0,
      paddingBottom: 200,
    },
    chaptersList: {
      paddingTop: 0,
      paddingBottom: 0,
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
    const { classes, wordbook } = this.props;
    return (
      <Card className={classes.card} >
        <CardContent className={classes.wordbook} >
          <Grid container direction='row' justify='space-between' alignItems='flex-start'>
            <Grid item xs={3}>
              <Grid container justify='flex-start' alignItems='center' className={classes.wordbookImg}>
                <img src={wordbook.imgSrc}
                  alt={'haha'}
                  className={classes.image}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction='column' justify='space-between' className={classes.wordbookContent} >
                <Grid item >
                  <Typography variant='h4' >
                    {wordbook.wbName}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant='body1' >
                    {wordbook.wbDescription}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography>
                    {`총 ${wordbook.totalWords}단어, ${wordbook.totalChapters} 챕터`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='flex-end' alignItems='center' className={classes.wordbookPercent}>
                <Typography variant='h2'>
                  {`${wordbook.wbPercentage}%`}
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
          <CardContent className={classes.chapters}>
            <List className={classes.chaptersList}>
              <Divider />
              {wordbook.chapters.map((chapter, index) => (
                <WordbookChapter chapter={chapter} key={index} />
              ))}
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
