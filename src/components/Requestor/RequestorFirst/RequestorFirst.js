import React, { Fragment } from 'react';
import { func, string, bool } from 'prop-types';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, CircularProgress, Paper } from '@material-ui/core';

const First = ({ money, onChange, onSubmit, disabled }) => {
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
        </Fragment>
    );
};

First.propTypes = {
    onChange: func.isRequired,
    onSubmit: func.isRequired,
    money: string.isRequired,
    disabled: bool.isRequired
};

export default First;