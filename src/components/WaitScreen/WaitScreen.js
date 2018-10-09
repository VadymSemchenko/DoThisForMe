import React, { Fragment } from 'react';
import { string, number, func, bool } from 'prop-types';
import { Typography, TextField, InputAdornment, Grid, Button } from '@material-ui/core';

const WaitScreen = ({
    text,
    currentBidValue,
    callRebid,
    onAccept,
    onReject,
    isAuthor
}) => {
    const bidButtonText = isAuthor ? 're-ask' : 're-bid';
    const negativeButtonText = isAuthor ? 'delete' : 'reject';
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
        >
            <Grid
                item
                container
                justify="space-between"
            >
                <Grid
                    item
                >
                    <Button
                        variant="contained"
                        children={bidButtonText}
                        onClick={callRebid}
                        color="primary"
                    />
                    {!isAuthor &&
                        <Button
                            variant="contained"
                            children="Accept"
                            onClick={onAccept}
                            color="primary"
                        />
                    }
                    <Button
                        variant="contained"
                        children={negativeButtonText}
                        onClick={onReject}
                        color="secondary"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

WaitScreen.propTypes = {
    text: string.isRequired,
    onReject: func.isRequired,
    onAccept: func.isRequired,
    isAuthor: bool.isRequired,
    callRebid: func.isRequired
};

export default WaitScreen;