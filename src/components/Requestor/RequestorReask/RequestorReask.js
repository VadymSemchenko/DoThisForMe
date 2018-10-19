import React, { Fragment, Component } from 'react';
import { func, string, bool } from 'prop-types';
import { TextField, FormLabel, Button } from '@material-ui/core';

class RequestorReask extends Component {
    state = {
        reaskIsOpen: false
    };

    static propTypes = {
        onChange: func.isRequired,
        onUpdate: func.isRequired,
        money: string.isRequired,
        disabled: bool.isRequired,
        clearInput: func.isRequired,
        isObsolete: bool.isRequired
    };

    openReask = () => {
        const { reaskIsOpen } = this.state;
        if (!reaskIsOpen) {
        this.setState(() => ({ reaskIsOpen: true }));
        }
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
            onUpdate,
            money,
            requestorBid,
            isObsolete
        } = this.props;
        const onClick = reaskIsOpen ? onUpdate : this.openReask;
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
                    disabled={!reaskIsOpen || isObsolete}
                    placeholder={requestorBid}
                    autoFocus={reaskIsOpen}
                    onClick={this.openReask}
                />
                {!reaskIsOpen &&
                <Button
                    variant="contained"
                    color="primary"
                    children={btnText}
                    onClick={onClick}
                    disabled={isObsolete}
                />}
                {reaskIsOpen &&
                <Button
                    variant="contained"
                    color="primary"
                    children={btnText}
                    onClick={onClick}
                    disabled={!money || isObsolete}
                />}
                {reaskIsOpen &&
                <Button
                    children="CANCEL"
                    onClick={this.closeReask}
                    variant="contained"
                    color="secondary"
                    disabled={isObsolete}
                />}
            </Fragment>
        );
    };

};

export default RequestorReask;