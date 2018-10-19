import React, { Component } from 'react';
import { Grid, Typography, Chip } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { func, array, string } from 'prop-types';
import queryString from 'query-string';
import Countdown from 'react-countdown-now';

import {
    startListeningForDeals,
    stopListeningForDeals,
    throwError,
    unsetNewMotionItem,
    unsetDeals,
    updateBid,
    acceptBid,
    deleteDeal
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';
import { HOME } from '../../../constants/routes';
import { DealItem } from '../..';

class OperatorManage extends Component {

    state = {
        expanded: null,
        motionID: ''
    };

    static propTypes = {
        deals: array.isRequired,
        startListeningForDeals: func.isRequired,
        stopListeningForDeals: func.isRequired,
        throwError: func.isRequired,
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
                search
            },
            deleteDeal,
            acceptBid,
            throwError,
            updateBid
        } = this.props;
        const noDeals = deals.length === 0;
        const { motionID, operatorID, deadline } = queryString.parse(search);
        const { expanded } = this.state;
        const isObsolete = deadline < Date.now();
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
                <Grid item>
                    {isObsolete && (
                        <Chip label="OBSOLETE" color="secondary" />
                    )}
                    {!isObsolete && (
                        <Chip label={<Countdown date={+deadline} />} color="primary" />
                    )}
                </Grid>
                {noDeals &&
                <Grid item>
                    <Typography
                        variant="display2"
                        children="No deals yet"
                    />
                </Grid>
                }
                {deals.map(item =>{
                    const { requestorID } = item;
                    return (
                        <DealItem
                            item={item}
                            key={requestorID}
                            userID={userID}
                            updateBid={updateBid}
                            submitReject={() => deleteDeal({ motionID, requestorID })}
                            acceptBid={acceptBid}
                            handleChange={this.handleChange(requestorID)}
                            expanded={expanded === requestorID}
                            isObsolete={isObsolete}
                        />
                    );
                })}
            </Grid>
        );
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
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
    stopListeningForDeals,
    unsetNewMotionItem,
    throwError,
    unsetDeals,
    updateBid,
    acceptBid,
    deleteDeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OperatorManage);
