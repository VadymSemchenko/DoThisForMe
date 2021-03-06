import React from 'react';
import { string } from 'prop-types';
import { SnackbarContent } from '@material-ui/core';

const RequestorComplete = ({ finalBid }) => {
    return (
            <SnackbarContent
                message={`NEGOTIATED! FINAL BID: ${finalBid}`}
            />
    );
};

RequestorComplete.propTypes = {
    finalBid: string.isRequired,
};

export default RequestorComplete;