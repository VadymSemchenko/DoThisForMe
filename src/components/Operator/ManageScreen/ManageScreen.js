import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { func, array } from 'prop-types';
import queryString from 'query-string';

import {
    listenForDeals,
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
        selectedDeal: ''
    };

    static propTypes = {
        deals: array.isRequired,
        listenForDeals: func.isRequired,
        throwError: func.isRequired,
        getMotion: func.isRequired,
        unsetNewMotionItem: func.isRequired,
        newMotionItem: newMotionInterface
    };

    componentDidMount() {
        const { listenForDeals, location: { pathname } } = this.props;
        listenForDeals(pathname);
    };

    componentWillUnmount() {
        const { listenForDeals, unsetNewMotionItem } = this.props;
        listenForDeals(null);
        unsetNewMotionItem();
        unsetDeals();
    };

    render() {
        const {
            authUid,
            deals,
            location: {
                search,
                pathname
            },
            deleteDeal,
            acceptBid,
            setBid
        } = this.props;
        const noDeals = deals.length === 0;
        const { operator } = queryString.parse(search);
        const { selectedDeal } = this.state;
            if(authUid !== operator) {
                throwError('You are not allowed to manage this motion!');
                return (
                    <Redirect to={HOME} />
                )   ;
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
                        key={item.requestor.uid}
                        item={item}
                        selectedDeal={selectedDeal}
                        authUid={authUid}
                        pathname={pathname}
                        setBid={setBid}
                        deleteDeal={deleteDeal}
                        acceptBid={acceptBid}
                        handleDealSelect={() => this.handleDealSelect(item.requestor.uid)}
                        handleDeselect={() => this.handleDealSelect('')}
                    />)}
            </Grid>
        );
    };

    handleDealSelect = (uid) => {
        this.setState(() => ({
            selectedDeal: uid
        }))
    };

};

const mapStateToProps = ({
    dealReducer: {
        deals
    },
    authReducer: {
        uid
    }
}) => ({ deals, authUid: uid });
const mapDispatchToProps = (dispatch) => bindActionCreators({
    listenForDeals,
    unsetNewMotionItem,
    throwError,
    getMotion,
    unsetDeals,
    setBid,
    acceptBid,
    deleteDeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotionScreen);
