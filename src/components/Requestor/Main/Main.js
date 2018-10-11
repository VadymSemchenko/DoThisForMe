import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, string, bool } from 'prop-types';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, CircularProgress, Paper } from '@material-ui/core';
import Countdown from 'react-countdown-now';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { First } from '../../';

import {
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';
import { HOME } from '../../../constants/routes';
import { REQUESTOR } from '../../../constants/userStatus';

class Requestor extends Component {

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

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     const {
    //         checkMotionForRequestorDeals,
    //         history,
    //         userID,
    //         newMotionItem
    //     } = nextProps;
    //     const { checked } = prevState;
    //     if(!checked && !!newMotionItem){
    //         const { key } = newMotionItem;
    //         console.log('HISTORY', history);
    //         checkMotionForRequestorDeals({ key, history, userID });
    //         return { checked: true }
    //     }
    //     return null;
    // };

    componentWillUnmount() {
        const { unsetNewMotionItem } = this.props;
        unsetNewMotionItem();
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
        console.log('DID_UPADETE');
        const { checked } = this.state;
        if (!checked) {
            setInterval(this.checkCountdown, 1000);
        }
    };

    render() {
        const { text, money } = this.state;
        const { isLoading, newMotionItem } = this.props;
        console.log('PROPS', this.props);
        if(!newMotionItem || isLoading){
            return (
                <Paper>
                    <Grid
                        container
                        justify="space-between"
                    >
                        <Grid
                            item
                            children={
                                <CircularProgress
                                    color='secondary'
                                />}
                        />
                        <Grid
                            item
                            children={
                                <CircularProgress
                                    color='secondary'
                                />}
                        />
                        <Grid item>
                        </Grid>
                        <Grid
                            item
                            children={
                                <CircularProgress
                                    color='secondary'
                                />}
                        />
                        <Grid
                            item
                            children={
                                <CircularProgress
                                    color='secondary'
                                />}
                        />
                        <Grid
                            item
                            children={
                                <CircularProgress
                                    color='secondary'
                                />}
                        />
                    </Grid>
                </Paper>);
        }
        const {
            newMotionItem: {
                operatorName,
                operatorID,
                motionName,
                deadline
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
                        variant="h3"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <Typography
                        children={operatorName}
                        variant="h2"
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
                    <First
                        onChange={this.handleTextChange}
                        onSubmit={this.handleSubmit}
                        money={money}
                        disabled={!money || !text}
                    />
                </Grid>
                {/* <Grid item>
                        <FormLabel component="legend">My Bid</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<TextField
                                            name="money"
                                            value={money}
                                            type="text"
                                            onChange={this.handleTextChange}
                                        />}
                            />
                        </FormGroup>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={
                        this.handleSubmit
                    }
                    children="Submit"
                    disabled={!money || !text}
                /> */}
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
            requestorTask: text,
            motionReference: key,
            operatorName,
            operatorID,
            operatorBid: '',
            accepted: false,
            deadline,
            motionName
        };
        initDeal({ newDeal, history });
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

}

const mapStateToProps = ({
    authReducer: {
        userID,
        userName
    },
    motionReducer: {
        newMotionItem
    },
    loadingReducer: {
        isLoading
    }
}) => ({ userID, userName, newMotionItem, isLoading });

const mapDispatchToProps = dispatch => bindActionCreators({
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Requestor));