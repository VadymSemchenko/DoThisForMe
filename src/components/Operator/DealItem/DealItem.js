import React, { Component, Fragment } from 'react';
import {
    Grid,
    Typography,
    Button,
    Chip,
    withStyles,
    TextField,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Paper
} from '@material-ui/core';
import {
    lightBlue,
    red,
    blueGrey,
    green
} from '@material-ui/core/colors';
import { ExpandMore } from '@material-ui/icons';
import { string, func } from 'prop-types';
import clNames from 'classnames';

import { dealItemInterface } from '../../../constants/interfaces';

const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      flexGrow: 1,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: '33.33%',
      flexShrink: 0,
      flexGrow: 1
    },
    pending: {
        backgroundColor: lightBlue[500]
    },
    new: {
        backgroundColor: green[500]
    },
    obsolete: {
        backgroundColor: red[500]
    },
    accepted: {
        backgroundColor: blueGrey[500]
    },
    requestorTask: {
        textAlign: 'center'
    },
    expanded: {
        backgroundColor: blueGrey[500]
    }
  });

class DealItem extends Component {

    state = {
        value: ''
    };

    static propTypes = {
        item: dealItemInterface.isRequired,
        userID: string.isRequired,
        submitReject: func.isRequired
    };

    render() {
        const {
            item: {
                requestorID,
                requestorName,
                requestorTask,
                accepted,
                lastBidBy,
                motionReference,
                operatorID,
                operatorBid,
                requestorBid,
                finalBid
            },
            classes,
            isObsolete,
            updateBid,
            submitReject,
            userID,
            expanded,
            handleChange
        } = this.props;
        let chipText;
        let chipClass;
        const newBidExists = lastBidBy !== userID;
        if (accepted) {
            chipText = 'ACCEPTED';
            chipClass = classes.accepted;
        } else {
            if (isObsolete) {
                chipText = "OBSOLETE";
                chipClass = classes.obsolete;
            } else {
                if (newBidExists)  {
                    chipText = 'NEW BID';
                    chipClass = classes.new;
                } else {
                    chipText = 'PENDING';
                    chipClass = classes.pending;
                };
            };
        };
        const { value } = this.state;
        const summaryCls = clNames({ [classes.expanded]: expanded });
        return (
            <ExpansionPanel expanded={expanded} onChange={handleChange} className={classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />} className={summaryCls}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography
                                variant="display1"
                                children={requestorName}
                            />
                        </Grid>
                        <Grid item>
                            <Chip
                                label={chipText}
                                className={chipClass}
                            />
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                variant="display1"
                                className={classes.requestorTask}
                                children={requestorTask}
                            />
                        </Grid>
                        {accepted &&
                            <Grid item>
                                    <Typography
                                        variant="display3"
                                        children="Negotiated"
                                        align="center"
                                        color="primary"
                                    />
                                    <Typography
                                        variant="display2"
                                        children={finalBid}
                                        align="center"
                                        color="secondary"
                                    />
                            </Grid>}
                            {(!accepted && (userID !== lastBidBy)) && (
                                <Fragment>
                                    <Paper>
                                        <Grid
                                            container
                                            justify="center"
                                        >
                                            <Grid item>
                                                <TextField
                                                    placeholder={operatorBid}
                                                    label="My bid"
                                                    value={value}
                                                    onChange={this.handleTextChange}
                                                    disabled={isObsolete}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    label={`${requestorName}\`s bid`}
                                                    value={requestorBid}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Grid
                                        container
                                        justify="center"
                                    >
                                        <Grid item>
                                            <Button
                                                children="REBID"
                                                onClick={() => updateBid({ requestorID, operatorBid: value, motionReference, lastBidBy: operatorID })}
                                                className={classes.new}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                children="REJECT"
                                                onClick={submitReject}
                                                className={classes.obsolete}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                children="ACCEPT"
                                                onClick={this.handleAccept}
                                                className={classes.accepted}
                                            />
                                        </Grid>
                                    </Grid>
                            </Fragment>)}
                            {(!accepted && userID === lastBidBy) && (
                                <Fragment>
                                    <Paper>
                                        <Grid
                                            container
                                            justify="center"
                                        >
                                            <Grid item>
                                                <TextField
                                                    label="My bid"
                                                    value={operatorBid}
                                                    onChange={this.handleTextChange}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    label={`${requestorName}\`s bid`}
                                                    value={requestorBid}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Grid
                                        container
                                        justify="center"
                                    >
                                        <Grid item>
                                            <Button
                                                children="REASK"
                                                onClick={() => updateBid({ requestorID, operatorBid: null, motionReference, lastBidBy: requestorID })}
                                                className={classes.new}
                                            />
                                        </Grid>
                                    </Grid>
                            </Fragment>)
                        }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    handleTextChange = ({ target: { value } }) => {
        this.setState(() => ({ value }));
    };

    handleAccept = () => {
        const { acceptBid, item: {
            requestorID: dealReference,
            motionReference,
            requestorBid: finalBid
        } } = this.props;
        acceptBid({
            dealReference,
            motionReference,
            finalBid
        });
    };

};

export default withStyles(styles)(DealItem);