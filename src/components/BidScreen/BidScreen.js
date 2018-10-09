import React, { Fragment } from 'react';
import { string, number, func } from 'prop-types';
import { Typography, TextField, InputAdornment, Button } from '@material-ui/core';

const BidScreen = (props) => {
    console.log('PROPS', props);
    const {
        onBid,
        handleBidChange,
        bidInputValue
    } = props;
    return (
        <Fragment>
            <Typography
                variant="h4"
                children="this is BidScreen"
            />
            <TextField
                type="text"
                value={bidInputValue}
                onChange={handleBidChange}
            />
            <Button
                onClick={onBid}
                variant="contained"
                color="primary"
                children="Submit"
            />
        </Fragment>
    );
}

BidScreen.propTypes = {
    onBid: func.isRequired,
    handleBidChange: func.isRequired,
    bidInputValue: string.isRequired
};

export default BidScreen;