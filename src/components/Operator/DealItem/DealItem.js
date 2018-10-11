import React, { Component, Fragment } from 'react';
import { Grid, Typography, Button, Chip, SnackbarContent } from '@material-ui/core';
import { string, func } from 'prop-types';

import { AccordeonItem } from '../../index';
import { dealItemInterface } from '../../../constants/interfaces';

class DealItem extends Component {

    state = {
        value: ''
    };

    static propTypes = {
        item: dealItemInterface.isRequired,
        selectedDeal: string.isRequired,
        handleDealSelect: func.isRequired,
        handleDeselect: func.isRequired,
        userID: string.isRequired,
    };

    render() {
        const {
            item: {
                requestorID,
                requestorName,
                operatorID,
                requestorBid,
                operatorBid,
                finalBid,
                requestorTask,
                accepted,
                lastBidBy
            },
            selectedDeal,
            handleDealSelect,
            handleDeselect,
            setBid,
            submitRebid,
            submitAccept,
            userID
        } = this.props;
        const chipColor = accepted ? 'secondary' : 'primary';
        const chipText = accepted ? 'accepted' : 'pending';
        const isSelected = selectedDeal === operatorID;
        const btnColor = isSelected ? 'secondary' : 'primary';
        const btnText = isSelected ? 'CLOSE' : 'MANAGE THIS DEAL';
        const btnOnClick = isSelected ? handleDeselect : handleDealSelect;
        const { value } = this.state;
        return (
            <Grid container direction="row" align-alignItems="center">
                <SnackbarContent key={operatorID}>
                    <Grid
                        container
                        justify='space-between'
                    >
                        <Grid item>
                            <Chip
                                label={chipText}
                                color={chipColor}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="display4" children={requestorName} />
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
                </SnackbarContent>
                {isSelected ? (
                <Grid item>
                    <AccordeonItem
                        requestorBid={requestorBid}
                        operatorBid={operatorBid}
                        requestorTask={requestorTask}
                        userID={userID}
                        lastBidBy={lastBidBy}
                        handleTextChange={this.handleTextChange}
                        onRebid={() => { setBid({id: requestorID, operatorBid: value}); }}
                        onReject={() => { submitReject(requestorID); }}
                        onAccept={() => { submitAccept(requestorID); }}
                        finalBid={finalBid}
                        value={value}
                    />
                </Grid>) : null}
            </Grid>
    )};

    handleTextChange = ({ target: { value } }) => {
        this.setState(() => ({ value }));
    };

};

export default DealItem;