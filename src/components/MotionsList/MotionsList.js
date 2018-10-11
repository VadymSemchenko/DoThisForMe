import React, { Fragment } from 'react';
import { string, func, array, shape } from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Countdown from 'react-countdown-now';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Link } from 'react-router-dom';

import { DEALS, REQUESTOR, OPERATOR } from '../../constants/routes';

const MotionList = ({ motions, userID, removeMotion }) => {
  return (
    <List>{motions.map(({
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
              <List key={key}>
                <ListItem>
                  <Chip
                    label={chipText}
                    color={chipColor}
                  />
                  <SnackbarContent
                    message={`${operatorName}: ${motionName}`}
                  />
                  {(isAuthor && userID) &&
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
                        disabled={isObsolete}
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
                <Divider/>
              </List>
            );
          })}
    </List>
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

export default MotionList;