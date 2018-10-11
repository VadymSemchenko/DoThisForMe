import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, string, bool } from 'prop-types';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, LinearProgress, CircularProgress, Paper } from '@material-ui/core';
import Countdown from 'react-countdown-now';
import queryString from 'query-string';

import { RequestorFirst, RequestorReask, RequestorRebid, RequestorComplete } from '../..';

import {
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem,
    unsetCurrentDeal,
    getDeal,
    acceptBid
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';
import { HOME } from '../../../constants/routes';

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
        newMotionItem: newMotionInterface
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            checkMotionForRequestorDeals,
            userID,
            newMotionItem,
            getDeal,
            currentDeal
        } = nextProps;
        const { checked } = prevState;
        if (!!currentDeal) {
            const { requestorTask, requestorBid } = currentDeal;
            return { checked: true, text: requestorTask, money: requestorBid };
        }
        if (!checked && !!newMotionItem){
            const { key } = newMotionItem;
            checkMotionForRequestorDeals({ key, userID});
            return { checked: true }
        }
        return null;
    };

    componentWillUnmount() {
        const { unsetNewMotionItem } = this.props;
        unsetNewMotionItem();
        unsetCurrentDeal();
        clearInterval(this.checkCountdown);
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

    componentDidUpdate() {
        const { checked } = this.state;
        if (!checked) {
            setInterval(this.checkCountdown, 1000);
        }
    };

    render() {
        const { text, money } = this.state;
        const { isLoading, newMotionItem, currentDeal } = this.props;
        if(!newMotionItem || isLoading){
            return <LinearProgress color="secondary" variant="query" />
        }
        const {
            newMotionItem: {
                operatorName,
                operatorID,
                motionName,
                deadline,
                userID
            }
        } = this.props;
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
                    <Countdown date={deadline} />
                </Grid>
                <Grid item>
                    <TextField
                        placeholder="Please, buy something for me"
                        name="text"
                        type="text"
                        value={text}
                        onChange={this.handleTextChange}
                        multiline
                        rows="5"
                    />
                </Grid>
                <Grid item>
                    {!currentDeal &&
                    <RequestorFirst
                        onChange={this.handleTextChange}
                        onSubmit={this.handleSubmit}
                        money={money}
                        disabled={!money || !text}
                    />}
                    {(!!currentDeal && (currentDeal.accepted && !!currentDeal.finalBid)) &&
                    <RequestorComplete
                        finalBid={currentDeal.finalBid}
                    />}
                    {(!!currentDeal && (!currentDeal.accepted && (currentDeal.lastBidBy === userID))) &&
                    <RequestorReask
                        onChange={this.handleTextChange}
                        onSubmit={this.handleSubmit}
                        money={money}
                        disabled={!money || !text}
                        clearInput={this.clearInput}
                    />}
                    {(!!currentDeal && (!currentDeal.accepted && (currentDeal.lastBidBy !== userID))) &&
                    <RequestorRebid
                        onChange={this.handleTextChange}
                        onSubmit={this.handleSubmit}
                        onAccept={this.handleAccept}
                        money={money}
                        disabled={!money || !text}
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
    };

    handleAccept = () => {
        const { acceptBid, userID, currentDeal: {
            operatorBid
        } } = this.props;
        acceptBid({ userID, finalBid: operatorBid });
    };

    checkCountdown = () => {
        const { throwError, newMotionItem, history } = this.props;
        if (!!newMotionItem) {
            const { deadline } = newMotionItem;
            if (Date.now() >= deadline) {
                throwError('This motion is obsolete!');
                history.replace(HOME);
            }
        }
    }

    clearInput = () => {
        this.setState(() => ({ money: '' }));
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
        currentDeal
    },
    loadingReducer: {
        isLoading
    }
}) => ({ userID, userName, newMotionItem, isLoading, currentDeal });

const mapDispatchToProps = dispatch => bindActionCreators({
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem,
    getDeal,
    unsetCurrentDeal,
    acceptBid
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestorMain);