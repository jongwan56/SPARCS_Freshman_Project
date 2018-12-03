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
  RadioGroup,
  Radio,
  FormControlLabel,
  Menu,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import {
  VolumeUp as VolumeUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import { WordbookChapter } from 'components'

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
    this.audio = new Audio('https://dict-dn.pstatic.net/naver/dic/naverdic/endic/pron/new/us/007/007943.mp3?_lsu_sa_=316898599d1a3fb6919831213a6451f81d2562153905bf9d69f2b0712b2c6e71b754978b6de57b7c89146ec5dd20b0a2247dff5f4b6361ca410fd03848e381edd2f9b9f16bdf31ca2417fb9e639e3b12');
  }

  state = {
    check: 'Never',
    anchorEl: null,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChangeCheck = event => {
    this.setState({ check: event.target.value });
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
    console.log(this.audio);
    // this.state.play ? this.audio.play() : this.audio.pause();
    this.audio.play();
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <Card className={classes.card}>
        <Grid container className={classes.wordCard} justify='space-between' >
          <Grid item xs={4} >
            <Grid container justify='center' alignItems='center' className={classes.wordCardItem1}>
              <Typography variant='body1'>
                {'save [seIv]'}
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
                      저장하다.
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
                  <Grid container >
                    <Typography variant='body1'>
                      {`ㅁ니아럼나ㅣㅇ러\n
                      ㅁㄴ이ㅏ럼ㄴ아ㅣ러
                      ㅁㄴ이ㅏ럼나ㅣㅇ러
                      민아럼나ㅣ어라ㅣ
                      ㅁ니ㅏ어라ㅣㅁㄴ어라ㅣㅁㄴ어라ㅣㅁ넝
                      ㅁ니아러ㅏㅣㅁㄴ어리ㅏㅁㄴ어리ㅏㅁ넝라ㅣ먼아ㅣ럼나ㅣㅇ러마ㅣㄴㅇ러
                      ㅁㄴ이ㅏ러마ㅣㄴ어리ㅏㅁㄴ어리ㅏ머
                      ㅁㄴ이ㅏ러마ㅣㄴㅇ러ㅣㅏㅁㄴ얼
                      ㅁㄴ이ㅏ럼나ㅣ어리ㅏㅁㄴ얼
                      ㅁㄴ이ㅏ럼나ㅣ어리ㅏㅁㄴ어리ㅏㅁ넝ㄹ
                      ㅁ니아러마ㅣㄴ어리ㅏㅁㄴ어라ㅣㅁㄴ어리ㅏ
                      ㅁㄴ이ㅏ럼나ㅣㅇ러ㅏㅣㅁㄴㅇ러ㅏㅣ먼ㄹㅇ`}
                    </Typography>
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

WordCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WordCard);
