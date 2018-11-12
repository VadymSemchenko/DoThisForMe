import React, { Fragment } from 'react';
import { string, func, array, shape } from 'prop-types';
import {
  List,
  ListItem,
  Button,
  Chip,
  Typography,
  withStyles,
  Paper
}from '@material-ui/core/';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';

import { REQUESTOR, OPERATOR } from '../../constants/routes';

const styles = {
  operatorName: {
    flexGrow: 1,
    margin: '0 2vw'
  },
  listRow: {
    width: '50px'
  },
  list: {
    marginTop: '50px'
  }
};

const MotionList = (props) => {
  const { motions, userID, removeMotion, classes } = props;
  return (
    <Paper>
      <List
        className={classes.list}
      >{motions.map(({
            key,
            operatorName,
            operatorID,
            motionName,
            deadline
          }) => {
              const isAuthor = (operatorID === userID);
              const isObsolete = Date.now() >= deadline;
              const chipText = isObsolete ? 'OBSOLETE' : <Countdown date={deadline} />;
              const chipColor = isObsolete ?  'secondary' : 'primary';
              return (
                <ListItem key={key}>
                  <Chip
                    label={chipText}
                    color={chipColor}
                  />
                  <Typography
                    children={`${operatorName}: ${motionName}`}
                    variant="display1"
                    className={classes.operatorName}
                  />
                  {(isAuthor) &&
                    <Fragment>
                      <Button
                        component={Link}
                        to={`${OPERATOR}?operatorID=${userID}&motionID=${key}&deadline=${deadline}`}
                        variant='contained'
                        color='primary'
                        children='MANAGE'
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {removeMotion(key)}}
                        children="REMOVE"
                      />
                    </Fragment>
                    }
                    {(!isAuthor && userID) &&
                      <Button
                        component={Link}
                        to={`${REQUESTOR}/?requestorID=${userID}&operatorID=${operatorID}&motionID=${key}`}
                        variant='contained'
                        color='primary'
                        children='JOIN'
                      />
                    }
                </ListItem>
              );
            })}
      </List>
    </Paper>
  );
}

MotionList.propTypes = {
  removeMotion: func.isRequired,
  motions: array.isRequired,
  userID: string.isRequired,
  listItem: shape({
    key: string,
    operatorName: string,
    operatorID: string,
    motionName: string
    }).isRequired
  }.isRequired;

export default withStyles(styles)(MotionList);