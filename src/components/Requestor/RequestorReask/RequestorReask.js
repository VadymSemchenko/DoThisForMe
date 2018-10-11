import React, { Fragment, Component } from 'react';
import { func, string, bool } from 'prop-types';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, CircularProgress, Paper } from '@material-ui/core';

class RequestorReask extends Component {
    state = {
        reaskIsOpen: false
    };

    static propTypes = {
        onChange: func.isRequired,
        onSubmit: func.isRequired,
        money: string.isRequired,
        disabled: bool.isRequired,
        clearInput: func.isRequired
    };

    openReask = () => {
        this.setState(() => ({ reaskIsOpen: true }));
    };

    closeReask = () => {
        this.setState(() => ({ reaskIsOpen: false }));
        const { clearInput } = this.props;
        clearInput();
    };

    render() {
        const { reaskIsOpen } = this.state;
        const {
            onChange,
            onSubmit,
            money,
            disabled,
            clearInput
        } = this.props;
        const onClick = reaskIsOpen ? onSubmit : this.openReask;
        const btnText = reaskIsOpen ? 'SUBMIT' : 'RE-ASK';
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
                    disabled={!reaskIsOpen}
                />
                <Button
                    variant="contained"
                    color="primary"
                    children={btnText}
                    onClick={onClick}
                    disabled={disabled && reaskIsOpen}
                />
                {reaskIsOpen &&
                <Button
                    children="CANCEL"
                    onClick={this.closeReask}
                    variant="contained"
                />}
            </Fragment>
        );
    };

};

export default RequestorReask;