import React, { Fragment } from 'react';
import { string, func } from 'prop-types';
import { TextField, Button } from '@material-ui/core';

const BidScreen = (props) => {
    const {
        onBid,
        handleBidChange,
        bidInputValue
    } = props;
    return (
        <Fragment>
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