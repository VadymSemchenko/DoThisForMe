import React from 'react';
import { string, func, bool } from 'prop-types';
import { Grid, Button } from '@material-ui/core';

const WaitScreen = ({
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
                justify="space-around"
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
                </Grid>
                {!isAuthor &&
                <Grid item>
                    <Button
                        variant="contained"
                        children="Accept"
                        onClick={onAccept}
                        color="primary"
                    />
                </Grid>
                }
                <Grid item>
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