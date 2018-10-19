import React, { Fragment } from 'react';
import { func, string, bool } from 'prop-types';
import { Button, TextField, FormLabel } from '@material-ui/core';

const RequestorRebid = ({
    money,
    onChange,
    onUpdate,
    disabled,
    operatorBid,
    requestorBid,
    onAccept,
    isObsolete
}) => {
    return (
        <Fragment>
            <FormLabel component="legend">
                My Bid
            </FormLabel>
            <TextField
                name="money"
                value={money}
                type="text"
                onChange={onChange}
                placeholder={requestorBid}
            />
            <Button
                variant="contained"
                color="primary"
                children="RE-BID"
                onClick={onUpdate}
                disabled={disabled}
            />
            <FormLabel component="legend">
                Operator`s Bid
            </FormLabel>
            <TextField
                value={operatorBid}
                type="text"
                disabled
            />
            <Button
                variant="contained"
                color="secondary"
                children="ACCEPT"
                onClick={onAccept}
                disabled={isObsolete}
            />
        </Fragment>
    );
};

RequestorRebid.propTypes = {
    onChange: func.isRequired,
    onUpdate: func.isRequired,
    money: string.isRequired,
    operatorBid: string.isRequired,
    disabled: bool.isRequired,
    onAccept: func.isRequired,
    isObsolete: bool.isRequired
};

export default RequestorRebid;