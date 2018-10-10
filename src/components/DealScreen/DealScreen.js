import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import { func, string, shape, bool } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

import {
    throwError,
    getDeal,
    unsetCurrentDeal,
    listenToDealStatusChanges,
    setBid,
    acceptBid,
    deleteDeal
} from '../../store/actionCreators';
import { HOME } from '../../constants/routes';
import { STRANGER, REQUESTOR, OPERATOR } from '../../constants/userStatus';
import { BidScreen, WaitScreen } from '../../components';

class DealScreen extends Component {

    state = {
        userStatus: null,
        rebidIsOpen: false,
        bidInputValue: ''
    };

    static propTypes = {
        throwError: func.isRequired,
        getDeal: func.isRequired,
        listenToDealStatusChanges: func.isRequired,
        currentDeal: shape({
            status: shape({
                accepted: bool
            }),
            currentBid: shape({
                value: string,
                authorStatus: string
            }),
            text: string,
            operator: shape({
                uid: string,
                displayName: string
            }),
            requestor: shape({
                uid: string,
                displayName: string
            })
        })
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            currentDeal,
            uid,
            getDeal,
            history,
            location: {
                pathname
                },
            listenToDealStatusChanges
            } = nextProps;
        const { userStatus } = prevState;
        if(!currentDeal) {
            getDeal({ pathname, history });
            return null;
        } else {
            if(!userStatus) {
                const { operator, requestor } = currentDeal;
                if(uid !== requestor.uid && uid !== operator.uid){
                    return { userStatus: STRANGER };
                }
                listenToDealStatusChanges(pathname);
                const userStatus = uid === requestor.uid ? REQUESTOR : OPERATOR;
                return { userStatus };
                }
            return null;
        }
    };

    componentWillUnmount() {
        unsetCurrentDeal();
        listenToDealStatusChanges(null);
    }

    render() {
        const { currentDeal, location: { pathname }, throwError } = this.props;
        const { userStatus, rebidIsOpen, bidInputValue } = this.state;
        if(!currentDeal){
            return (
                <Grid container justify="space-between">
                    <Grid item >
                        <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item >
                        <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item >
                        <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item >
                        <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item >
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
            );
        }
        if(currentDeal){
            const { currentBid: { authorStatus, value }, text, finishTime, status: { accepted } } = currentDeal;
            if(Date.now() >= finishTime){
                throwError('This deal is oblosete!');
            }
            const isAuthor = userStatus === authorStatus;
            if(userStatus === STRANGER){
                throwError('You are neither operator nor requestor!');
                return <Redirect to={HOME}/>;
            };
            if(accepted) {
                const message = `The bid has been accepted: ${text} for ${value}`;
                throwError(message);
                return <Redirect to={HOME}/>;
            }

            return(
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <CountdownTimer
                            endDate={moment(finishTime)}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h4"
                            align="center"
                        >
                            {`${text} for ${value} by ${authorStatus}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                    {rebidIsOpen ?
                        <BidScreen
                            currentBidValue={value}
                            text={text}
                            handleBidChange={this.handleInputChange}
                            onBid={() => {this.submitRebid(pathname)}}
                            bidInputValue={bidInputValue}
                        /> :
                        <WaitScreen
                            currentBidValue={value}
                            text={text}
                            callRebid={this.callRebid}
                            onAccept={() => {this.handleBidAccept(pathname)}}
                            onReject={() => {this.handleBidReject(pathname)}}
                            isAuthor={isAuthor}
                        />
                    }
                    </Grid>
                </Grid>
            );
        };
    };

    callRebid = () => {
        this.setState(() => ({ rebidIsOpen: true }));
    };

    submitRebid = (pathname) => {
        const { setBid } = this.props;
        const { bidInputValue, userStatus } = this.state;
        if(bidInputValue){
            setBid({ pathname, value: bidInputValue, userStatus });
            this.setState(() => ({
                bidInputValue: '',
                rebidIsOpen: false
            }))
        }
    };

    handleBidAccept = (pathname) => {
        const { acceptBid } = this.props;
        const { userStatus } = this.state;
        acceptBid({ pathname, userStatus });
    };

    handleBidReject = (pathname) => {
        const { deleteDeal } = this.props;
        deleteDeal(pathname)
    };

    handleInputChange = ({ target: { value } }) => {
        this.setState(() => ({ bidInputValue: value }));
    };
};


const mapStateToProps = ({
    dealReducer: {
        currentDeal
    },
    authReducer: {
        uid
    }
}) => ({ currentDeal, uid });
const mapDispatchToProps = dispatch => bindActionCreators({
    throwError,
    getDeal,
    unsetCurrentDeal,
    listenToDealStatusChanges,
    setBid,
    acceptBid,
    deleteDeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DealScreen);