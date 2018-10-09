import React, { Component, Fragment } from 'react';
import { TextField, Grid, Typography, Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { func, string, number, shape, array } from 'prop-types';
import queryString from 'query-string';

import {
    listenForDeals,
    throwError,
    getMotion,
    unsetNewMotionItem
} from '../../../store/actionCreators';
import { newMotionInterface } from '../../../constants/interfaces';
import { HOME } from '../../../constants/routes';

class MotionScreen extends Component {

    state

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
    };

    render() {
        const { authUid, deals, location: { search, pathname } } = this.props;
        const { operator } = queryString.parse(search);
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
                <Grid item>
                    <Typography
                        variant="h3"
                        children="Motion Management Screen"
                    />
                </Grid>
                {deals.map(item => {
                    const { requestor: { displayName, uid }, text, currentBid } = item;
                    return (
                        <Grid item key={uid}>
                            <Paper>
                                    <Grid
                                        container
                                        justify='space-between'
                                    >
                                        <Grid item container>
                                            <Typography variant="h6">
                                                {`Requestor: ${displayName}. Current Bid: ${currentBid}UAH. Task: ${text}`}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleDealSelect}
                                                children="Manage This Deal"
                                                component={Link}
                                                to={`${pathname}/${uid}`}
                                            />
                                        </Grid>
                                    </Grid>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }
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
    getMotion
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotionScreen);
