import React, { Fragment } from 'react';
import { func, string, bool } from 'prop-types';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, CircularProgress, Paper } from '@material-ui/core';

const RequestorRebid = ({
    money,
    onChange,
    onSubmit,
    disabled,
    operatorBid,
    onAccept
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
            />
            <Button
                variant="contained"
                color="primary"
                children="My Bid"
                onClick={onSubmit}
                disabled={disabled}
            />
            <FormLabel component="legend">
                Operator`s Bid
            </FormLabel>
            <TextField
                name="money"
                value={money}
                type="text"
                onChange={onChange}
            />
            <Button
                variant="contained"
                color="secondary"
                children="My Bid"
                onClick={onAccept}
            />
        </Fragment>
    );
};

RequestorRebid.propTypes = {
    onChange: func.isRequired,
    onSubmit: func.isRequired,
    money: string.isRequired,
    operatorBid: string.isRequired,
    disabled: bool.isRequired,
    onAccept: func.isRequired
};

export default RequestorRebid;