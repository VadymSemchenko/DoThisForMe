import React, { Component, Fragment } from 'react';
import { Grid, Typography, Button, Chip } from '@material-ui/core';
import { string, func } from 'prop-types';

import { BidScreen, WaitScreen } from '../';
import { dealItemInterface } from '../../constants/interfaces';
import { OPERATOR } from '../../constants/userStatus';

class DealItem extends Component {

    state = {
        value: '',
        rebidIsOpen: false
    };

    static propTypes = {
        item: dealItemInterface.isRequired,
        selectedDeal: string.isRequired,
        handleDealSelect: func.isRequired,
        handleDeselect: func.isRequired,
        authUid: string.isRequired,
        pathname: string.isRequired
    };

    render() {
        const {
            item: {
                requestor: {
                    displayName,
                    uid
                },
                text,
                currentBid: {
                    value,
                    authorStatus
                },
                status: {
                    accepted
                },
                finishTime
            },
            selectedDeal,
            handleDealSelect,
            handleDeselect,
            deleteDeal,
            pathname
        } = this.props;
        const chipColor = accepted ? 'secondary' : 'primary';
        const chipText = accepted ? 'accepted' : 'pending';
        const isObsolete = Date.now() >= finishTime;
        const isSelected = selectedDeal === uid;
        const btnColor = isSelected ? 'secondary' : 'primary';
        const btnText = isSelected ? 'CLOSE' : 'MANAGE THIS DEAL';
        const btnOnClick = isSelected ? handleDeselect : handleDealSelect;
        const userStatus = OPERATOR;
        const isAuthor = userStatus === authorStatus;
        const { rebidIsOpen } = this.state;
        return (
            <Fragment key={uid}>
                <Grid
                    container
                    justify='space-between'
                >
                    <Grid item>
                        <Chip
                            label={chipText}
                            color={chipColor}
                            disabled={isObsolete}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            {`Requestor: ${displayName}. Current Bid: ${value}. Task: ${text}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color={btnColor}
                            onClick={btnOnClick}
                            children={btnText}
                            disabled={accepted}
                        />
                    </Grid>
                </Grid>
{isSelected ?
    (rebidIsOpen ?
        <BidScreen
            currentBidValue={value}
            text={text}
            handleBidChange={this.handleInputChange}
            onBid={() => {this.submitRebid(`${pathname}/${uid}`)}}
            bidInputValue={this.state.value}
        /> :
        <WaitScreen
            currentBidValue={value}
            text={text}
            callRebid={this.toggleRebid}
            onAccept={() => {this.handleBidAccept(`${pathname}/${uid}`)}}
            onReject={() => {deleteDeal(`${pathname}/${uid}`)}}
            isAuthor={isAuthor}
        />)
    : null}
        </Fragment>);
    };

    handleInputChange = ({ target: { value } }) => {
        this.setState(() => ({ value }));
    };

    toggleRebid = () => {
        this.setState(({ rebidIsOpen }) => ({ rebidIsOpen: !rebidIsOpen, value: '' }));
    };

    submitRebid = (pathname) => {
        const { setBid } = this.props;
        const userStatus = OPERATOR;
        const { value } = this.state;
        if(value){
            setBid({ pathname, value, userStatus });
            this.toggleRebid();
        }
    };

    handleBidAccept = (pathname) => {
        const { acceptBid } = this.props;
        const { userStatus } = OPERATOR;
        acceptBid({ pathname, userStatus });
    };

};

export default DealItem;