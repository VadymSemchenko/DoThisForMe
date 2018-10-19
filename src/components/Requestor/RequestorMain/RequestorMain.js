import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, string, bool } from 'prop-types';
import { Grid, Chip, Typography, TextField, LinearProgress } from '@material-ui/core';
import Countdown from 'react-countdown-now';
import queryString from 'query-string';

import { RequestorFirst, RequestorReask, RequestorRebid, RequestorComplete } from '../..';
import { HOME } from '../../../constants/routes';

import {
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem,
    unsetCurrentDeal,
    acceptBid,
    updateBid
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';

class RequestorMain extends Component {

    state = {
        text: '',
        money: '',
        checked: false
    };

    static propTypes = {
        isLoading: bool.isRequired,
        getMotion: func.isRequired,
        throwError: func.isRequired,
        initDeal: func.isRequired,
        checkMotionForRequestorDeals: func.isRequired,
        unsetNewMotionItem: func.isRequired,
        userID: string,
        userName: string.isRequired,
        newMotionItem: newMotionInterface,
        isCheckingDeals: bool.isRequired
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            checkMotionForRequestorDeals,
            userID,
            newMotionItem
        } = nextProps;
        const { checked } = prevState;
        if (!checked && !!newMotionItem){
            const { key } = newMotionItem;
            checkMotionForRequestorDeals({ key, userID});
            return { checked: true }
        }
        return null;
    };

    componentWillUnmount() {
        const { unsetNewMotionItem, unsetCurrentDeal } = this.props;
        unsetNewMotionItem();
        unsetCurrentDeal();
    };

    componentDidMount() {
        const {
            getMotion,
            newMotionItem,
            location
        } = this.props;
        if (!newMotionItem) {
            const { search } = location;
            const { motionID } = queryString.parse(search);
            getMotion(motionID);
        }
    };

    render() {
        const { text, money, checked } = this.state;
        const {
            isLoading,
            newMotionItem,
            currentDeal,
            history,
            isCheckingDeals,
            throwError
        } = this.props;
        const placeholder = currentDeal ? currentDeal.requestorTask : "Please, buy something for me";
        if(!newMotionItem || isLoading || !checked){
            return <LinearProgress color="secondary" variant="query" />
        }
        const {
            newMotionItem: {
                operatorName,
                operatorID,
                motionName,
                deadline,
            },
            userID
        } = this.props;
        if(userID === operatorID){
            throwError('You are not allowed to attend this page');
            return <Redirect to={HOME}/>;
        }
        const isObsolete = Date.now() >= deadline;
        const disabled = (isObsolete||(!!currentDeal && !!currentDeal.accepted));
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <Grid item>
                    <Typography
                        children={motionName}
                        variant="display3"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <Typography
                        children={operatorName}
                        variant="display2"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    {isObsolete ? <Chip color="secondary" label="OBSOLETE" /> : <Countdown date={deadline} />}
                </Grid>
                <Grid item>
                    <TextField
                        placeholder={placeholder}
                        name="text"
                        type="text"
                        value={text}
                        onChange={this.handleTextChange}
                        onFocus={this.toggleFreezeInput}
                        multiline
                        rows="5"
                        disabled={disabled}
                    />
                </Grid>
                <Grid item>
                    {(!currentDeal && !isCheckingDeals) &&
                    <RequestorFirst
                        onChange={this.handleTextChange}
                        onSubmit={this.handleSubmit}
                        money={money}
                        disabled={!money || !text}
                        throwError={throwError}
                        isObsolete={isObsolete}
                        history={history}
                        deadline={deadline}
                    />}
                    {(!!currentDeal && currentDeal.accepted) &&
                    <RequestorComplete
                        finalBid={currentDeal.finalBid}
                    />}
                    {(!!currentDeal && (!currentDeal.accepted && (currentDeal.lastBidBy === userID))) &&
                    <RequestorReask
                        money={money}
                        requestorBid={currentDeal.requestorBid}
                        onChange={this.handleTextChange}
                        onUpdate={this.handleUpdate}
                        disabled={!text}
                        isObsolete={isObsolete}
                        clearInput={this.clearInput}
                    />}
                    {(!!currentDeal && (!currentDeal.accepted && (currentDeal.lastBidBy !== userID))) &&
                    <RequestorRebid
                        operatorBid={currentDeal.operatorBid}
                        requestorBid={currentDeal.requestorBid}
                        onChange={this.handleTextChange}
                        onUpdate={this.handleUpdate}
                        onAccept={this.handleAccept}
                        isObsolete={isObsolete}
                        money={money}
                        disabled={!money}
                    />}
                </Grid>
            </Grid>
        );
    }

    handleTextChange = ({ target: { name, value } }) => {
        this.setState(() => ({ [name]: value }));
    };

    handleSubmit = () => {
        const { text, money } = this.state;
        const {
            userID,
            userName,
            initDeal,
            history,
            newMotionItem: {
                operatorName,
                operatorID,
                key,
                deadline,
                motionName
            }
        } = this.props;
        const newDeal = {
            requestorID: userID,
            requestorName: userName,
            requestorBid: money,
            lastBidBy: userID,
            requestorTask: text,
            motionReference: key,
            operatorName,
            operatorID,
            operatorBid: '',
            finalBid: '',
            accepted: false,
            deadline,
            motionName
        };
        initDeal({ newDeal, history });
        this.clearInput();
    };

    handleAccept = () => {
        const { acceptBid, userID, currentDeal: {
            operatorBid, motionReference
        } } = this.props;
        const bidArgs = {
            dealReference: userID,
            finalBid: operatorBid,
            motionReference
        };
        acceptBid(bidArgs);
    };

    handleUpdate = () => {
        const {
            updateBid,
            userID,
            newMotionItem: {
                key
            }
        } = this.props;
        const { text, money } = this.state;
        const newBidFeatures = {
            motionReference: key,
            userID,
            requestorID: userID,
            requestorBid: money,
            lastBidBy: userID
        };
        if (!!text) {
            newBidFeatures.requestorTask = text;
        }
        updateBid(newBidFeatures);
        this.clearInput();
    }

    clearInput = () => {
        this.setState(() => ({ money: '', text: '' }));
    };

}

const mapStateToProps = ({
    authReducer: {
        userID,
        userName
    },
    motionReducer: {
        newMotionItem
    },
    dealReducer: {
        currentDeal,
        isCheckingDeals
    },
    loadingReducer: {
        isLoading
    }
}) => ({ userID, userName, newMotionItem, isLoading, currentDeal, isCheckingDeals });

const mapDispatchToProps = dispatch => bindActionCreators({
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem,
    unsetCurrentDeal,
    acceptBid,
    updateBid
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestorMain);