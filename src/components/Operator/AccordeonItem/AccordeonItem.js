import React, { Fragment } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { func, string, shape, bool } from 'prop-types';

const AccordeonItem = ({
    requestorBid,
    operatorBid,
    requestorName,
    handleTextChange,
    onRebid,
    onReject,
    onAccept,
    userID,
    lastBidBy,
    accepted,
    finalBid,
    value,
    requestorTask
}) => ( <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid item>
                <Typography
                    variant="display3"
                    children={requestorTask}
                />
            </Grid>
            {accepted &&
            <Grid item>
                <Fragment>
                    <Typography
                        variant="display3"
                        children="Negotiated"
                    />
                    <Typography
                        variant="display4"
                        children={finalBid}
                    />
                </Fragment>
            </Grid>}
            {(!accepted && userID !== lastBidBy) &&
            <Fragment>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Grid item>
                        <TextField
                            label="My bid"
                            value={value}
                            onChange={handleTextChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label={`${requestorName} bid`}
                            value={requestorBid}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Button
                            children="REBID"
                            onClick={onRebid}
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            children="REJECT"
                            onClick={onReject}
                            color="secondary"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            children="ACCEPT"
                            onClick={onAccept}
                            color="primary"
                        />
                    </Grid>
                </Grid>

            </Fragment>
            }
            {(!accepted && userID !== lastBidBy) &&
            <Fragment>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Grid item>
                        <TextField
                            label="My bid"
                            value={value}
                            onChange={handleTextChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label={`${requestorName} bid`}
                            value={requestorBid}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Button
                            children="REBID"
                            onClick={onRebid}
                            color="primary"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            children="REJECT"
                            onClick={onReject}
                            color="secondary"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            children="ACCEPT"
                            onClick={onAccept}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </Fragment>}
        </Grid>
    );

AccordeonItem.propTypes = {
    requestorBid: string.isRequired,
    operatorBid: string.isRequired,
    requestorTask: string.isRequired,
    handleInputChange: func.isRequired,
    onRebid: func.isRequired,
    onReject: func.isRequired,
    onAccept: func.isRequired
};

export default AccordeonItem;