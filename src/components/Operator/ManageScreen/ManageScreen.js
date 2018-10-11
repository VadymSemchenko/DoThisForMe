import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { func, array, string } from 'prop-types';
import queryString from 'query-string';

import {
    startListeningForDeals,
    stopListeningForDeals,
    throwError,
    getMotion,
    unsetNewMotionItem,
    unsetDeals,
    setBid,
    acceptBid,
    deleteDeal
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';
import { HOME } from '../../../constants/routes';
import { DealItem } from '../..';

class MotionScreen extends Component {

    state = {
        selectedDeal: '',
        motionID: ''
    };

    static propTypes = {
        deals: array.isRequired,
        startListeningForDeals: func.isRequired,
        stopListeningForDeals: func.isRequired,
        throwError: func.isRequired,
        getMotion: func.isRequired,
        unsetNewMotionItem: func.isRequired,
        newMotionItem: newMotionInterface,
        userID: string.isRequired
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { motionID } = prevState;
        if(!motionID) {
            const { location: { search } } = nextProps;
            const { motionID } = queryString.parse(search);
            return { motionID };
        }
        return null;
    };

        componentDidMount() {
        const { startListeningForDeals } = this.props;
        const { motionID } = this.state;
        startListeningForDeals(motionID);
    };

    componentWillUnmount() {
        const { unsetNewMotionItem } = this.props;
        const { motionID } = this.state;
        stopListeningForDeals(motionID);
        unsetNewMotionItem();
        unsetDeals();
    };

    render() {
        const {
            userID,
            deals,
            location: {
                search,
                pathname
            },
            deleteDeal,
            acceptBid,
            setBid,
            throwError
        } = this.props;
        const noDeals = deals.length === 0;
        const { motionID, operatorID } = queryString.parse(search);
        const { selectedDeal } = this.state;
        if(userID !== operatorID) {
            throwError('You are not allowed to manage this motion!');
            return <Redirect to={HOME}/>
        }
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                {noDeals &&
                    <Grid item>
                        <Typography
                            variant="display2"
                            children="No deals yet"
                        />
                    </Grid>
                }
                {deals.map(item =>
                    <DealItem
                        key={item.requestorID}
                        item={item}
                        selectedDeal={selectedDeal}
                        userID={userID}
                        pathname={pathname}
                        setBid={setBid}
                        deleteDeal={deleteDeal}
                        acceptBid={acceptBid}
                        handleDealSelect={() => this.handleDealSelect(item.requestorID)}
                        handleDeselect={() => this.handleDealSelect('')}
                    />)}
            </Grid>
        );
    };

    handleDealSelect = (id) => {
        this.setState(() => ({
            selectedDeal: id
        }))
    };

};

const mapStateToProps = ({
    dealReducer: {
        deals
    },
    authReducer: {
        userID
    }
}) => ({ deals, userID });
const mapDispatchToProps = (dispatch) => bindActionCreators({
    startListeningForDeals,
    unsetNewMotionItem,
    throwError,
    getMotion,
    unsetDeals,
    setBid,
    acceptBid,
    deleteDeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotionScreen);
