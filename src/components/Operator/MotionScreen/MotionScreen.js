import React, { Component } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { listenForDeals } from '../../../store/actionCreators';
import { bindActionCreators } from '../../../../../../.cache/typescript/3.0/node_modules/redux';

class MotionScreen extends Component {

    state = {
        deals: []
    };

    componentDidMount() {
        const {
            listenForDeals,
            location: {
                pathname
            }
        } = this.props;
        listenForDeals(pathname);
    };

    componentWillUnmount() {
        listenForDeals(null);
    };

    render() {
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <TextField value="Motion Screen"/>
            </Grid>
        );
    }
};

const mapStateToProps = ({dealReducer: { deals } }) => ({ deals });
const mapDispatchToProps = (dispatch) => bindActionCreators({ listenForDeals }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MotionScreen);
