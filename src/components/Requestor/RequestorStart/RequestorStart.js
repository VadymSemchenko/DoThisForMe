import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, object, shape, string, number, oneOfType, bool } from 'prop-types';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, CircularProgress, Paper } from '@material-ui/core';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

import {
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';
import { REQUESTOR } from '../../../constants/userStatus';

class Requestor extends Component {

    state = {
        inputs: {
            text: '',
            money: '10'
        },
        checked: false
    };

    static propTypes = {
        isLoading: bool.isRequired,
        getMotion: func.isRequired,
        throwError: func.isRequired,
        initDeal: func.isRequired,
        checkMotionForRequestorDeals: func.isRequired,
        unsetNewMotionItem: func.isRequired,
        requestor: shape({
            uid: string,
            displayName: string
        }).isRequired,
        newMotionItem: newMotionInterface
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
                getMotion,
                newMotionItem,
                location: { pathname },
                history,
                requestor: { uid },
                checkMotionForRequestorDeals
                } = nextProps;
        if(!newMotionItem) {
            getMotion(pathname);
            return null;
        } else{
            if(!prevState.checked){
                const { key } = newMotionItem;
                checkMotionForRequestorDeals({ key, history, uid });
                return { checked: true }
            }
            return null;
        }
    }

    componentWillUnmount() {
        const { unsetNewMotionItem } = this.props;
        unsetNewMotionItem();
    }

    render() {
        const { text, money } = this.state;
        const { isLoading, newMotionItem } = this.props;
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
            requestor,
            newMotionItem: {
                operator,
                task,
                time: {
                    finishTime
                }
            },
        } = this.props;
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <Grid item>
                    <Typography
                        children={task.name}
                        variant="h3"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <Typography
                        children={operator.displayName}
                        variant="display2"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <CountdownTimer
                        endDate={moment(finishTime)}
                    />
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
                />
            </Grid>
        );
    }

    handleTextChange = ({ target: { name, value } }) => {
        this.setState(({ inputs }) => ({
            inputs: {
                ...inputs,
                [name]: value
            }
        }));
    };

    handleSubmit = () => {
        const {
            inputs: {
                text,
                money
            }
        } = this.state;
        const {
            requestor,
            initDeal,
            history,
            newMotionItem: {
                operator,
                key,
                time: {
                    finishTime
                },
            },
        } = this.props;
            const newDeal = {
                text,
                currentBid: {
                    value: money,
                    authorStatus: REQUESTOR
                },
                motionReference: key,
                requestor,
                operator,
                status: {
                    accepted: false,
                },
                finishTime,
            };
           initDeal({ newDeal, history });
        };

}

const mapStateToProps = ({
    authReducer: requestor,
    motionReducer: {
        newMotionItem
    },
    loadingReducer: {
        isLoading
    }
}) => ({ requestor, newMotionItem, isLoading });
const mapDispatchToProps = dispatch => bindActionCreators({
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals,
    unsetNewMotionItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);