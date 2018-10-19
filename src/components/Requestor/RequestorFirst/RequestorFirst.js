import React, { Fragment } from 'react';
import { func, string, bool } from 'prop-types';
import { Button, TextField, FormLabel } from '@material-ui/core';

import { HOME } from '../../../constants/routes';

const RequestorFirst = ({ money, onChange, onSubmit, disabled, deadline, throwError, history }) => {
    if (Date.now() >= deadline) {
        throwError('This motion is obsolete!');
        history.replace(HOME);
    }
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

RequestorFirst.propTypes = {
    onChange: func.isRequired,
    onSubmit: func.isRequired,
    money: string.isRequired,
    disabled: bool.isRequired,
    throwError: func.isRequired
};

export default RequestorFirst;