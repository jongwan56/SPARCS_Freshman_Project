import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
  Typography,
  IconButton,
  Grid,
  Card,

  RadioGroup,
  Radio,
  FormControlLabel,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import {
  VolumeUp as VolumeUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import axios from 'axios';
import { wordCheckPutRequest} from 'actions/wordbook.js';


const styles = theme => ({
  card: {
    width: 1000,
  },
  wordCard: {
    height: 60,
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
  },
  wordCardItem1: {
    height: '100%',
    paddingLeft: theme.spacing.unit * 2,
  },
  wordCardItem3: {
    height: '100%',
    paddingRight: theme.spacing.unit * 2,
  },
  detailPaper: {
    width: 380,
    minHeight: 100,
    padding: theme.spacing.unit * 3,
  },
  popper: {
    zIndex: 1500,
  },
  meaningRef: {
    height: 4,
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
});

class WordCard extends Component {
  constructor(props) {
    super(props);
    this.meaningRef = React.createRef();
    // this.audio = new Audio(this.props.mp3);
  }

  state = {
    check: this.props.word.check,
    anchorEl: null,
    pronunciation: '',
    audioLink: '',
    detail: [],
  };

  componentDidMount = async () => {
    const { word } = this.props;
    const result = await axios.get(`/api/dict/search?word=${word.word}`);
    console.log(result);

    this.setState({ audioLink: result.data.mp3, detail: result.data.meanings, pronunciation: result.data.pronunciation });
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChangeCheck = async (event) => {
    const value = event.target.value;
    this.setState({ check: value });
    await this.props.wordCheckPutRequest(this.props.word._id, value);
    
  };

  handleClickDetailButton = event => {
    console.log(this.meaningRef.current)
    console.log( event.currentTarget)
    // this.setState({ anchorEl: event.currentTarget });
    this.setState({ anchorEl: this.meaningRef.current });
    
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickPlay = () => {
    // this.state.play ? this.audio.play() : this.audio.pause();
    new Audio(this.state.audioLink).play();
  }

  render() {
    const { classes, word } = this.props;
    const { anchorEl } = this.state;
    console.log(this.state)
    return (
      <Card className={classes.card}>
        <Grid container className={classes.wordCard} justify='space-between' >
          <Grid item xs={4} >
            <Grid container justify='center' alignItems='center' className={classes.wordCardItem1}>
              <Typography variant='body1'>
                {`${word.word} ${this.state.pronunciation}`}
              </Typography>
              <IconButton onClick={this.handleClickPlay}>
                <VolumeUpIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item >
            <Grid container justify='center' alignItems='center' className={classes.wordCardItem} >
              <div style={{
                border: '0.5px dashed #CCCCCC',
                height: '80%'
                }}>
              </div>
            </Grid>
          </Grid>
         
          <Grid item xs={4}>
            
              <Grid container justify='space-between' alignItems='center' className={classes.wordCardItem}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <Grid container justify='center'>
                    <Typography variant='body1'>
                      {word.meaning}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Grid container justify='center'>
                    <IconButton onClick={this.handleClickDetailButton} >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <div ref={this.meaningRef}  className={classes.meaningRef}>
            </div>
          </Grid>
          
          <Grid item >
            <Grid container justify='center' alignItems='center' className={classes.wordCardItem}>
              <div style={{
                border: '0.5px dashed #CCCCCC',
                height: '80%'
                }}>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container justify='center' alignItems='center' className={classes.wordCardItem3}>
              <RadioGroup
                aria-label="position"
                name="position"
                value={this.state.check}
                onChange={this.handleChangeCheck}
                row
              >
                <FormControlLabel
                  value='Never'
                  control={<Radio color="primary" />}
                  label="😥"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value='Good'
                  control={<Radio color="primary" />}
                  label="🤔"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value='Perfect'
                  control={<Radio color="primary" />}
                  label="😄"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal className={classes.popper}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.detailPaper} >
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grid container direction='column'>
                    {this.state.detail.map((line, index) => (
                      <Typography variant='body1' key={index} >
                        {line}
                      </Typography>
                    ))}
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Card>
    );
  }

}

const mapStateToProps = (state) => {
  return {
      putStatus: state.wordbook.put
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    wordCheckPutRequest: (wordId, checkState) => {
          return dispatch(wordCheckPutRequest(wordId, checkState));
      }
  };
};

WordCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WordCard));
