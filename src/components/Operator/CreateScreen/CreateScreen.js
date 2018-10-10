import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { TimePicker } from 'material-ui-time-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { string, func } from 'prop-types';

import { initMotion, throwError } from '../../../store/actionCreators';

let inAnHour = new Date();
inAnHour.setHours(inAnHour.getHours() + 1);

class OperatorCreate extends Component {

    state = {
        clockIsOpen: false,
        time: inAnHour,
        value: ''
    };

    static propTypes = {
        userID: string.isRequired,
        userName: string.isRequired,
        initMotion: func.isRequired
    };

    render() {
        const { time, value } = this.state;
        let hours = time.getHours();
        let minutes = time.getMinutes();
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <Grid item>
                    <TextField
                    placeholder="What I can do for people"
                    label="What you can do or deliver"
                    name="value"
                    value={value}
                    onChange={this.handleTextChange}
                    multiline
                    rows="5"
                    />
                </Grid>
                <Grid item>
                    <TextField
                    value={`${hours}:${minutes}`}
                    onFocus={this.toggleClock}/>
                </Grid>
                <Grid item>
                {this.state.clockIsOpen && (
                    <TimePicker
                    mode='24h'
                    value={time}
                    onChange={this.handleTimeChange}
                    onMinutesSelected={this.toggleClock}
                />
                )}
                </Grid>
                <Grid item>
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.createMotion}
                    disabled={!this.state.value}
                    >
                        Create Motion!
                    </Button>
                </Grid>
            </Grid>
        );
    }

    handleTextChange = ({ target: { name, value } }) => {
        this.setState(() => ({
            [name]: value
        }));
    }

    handleTimeChange = (time) => {
        const { throwError } = this.props;
        if (time.getTime() <= Date.now()){
            throwError('Have you invented a time machine?');
        } else {
            this.setState(() => ({ time }));
        }
    };

    toggleClock = () => {
        this.setState((prevState) => ({ clockIsOpen: !prevState.clockIsOpen }));
    }

    createMotion = () => {
        const { userName, userID, initMotion, history } = this.props;
        const { value, time } = this.state;
        const newMotion = {
            operatorName: userName,
            operatorID: userID,
            motionName: value,
            deadline: time.getTime()
        };
        initMotion({ newMotion, history });
    };
}

const mapStateToProps = ({ authReducer: { userName, userID } }) => ({ userName, userID });
const mapDispatchToProps = dispatch => bindActionCreators({ initMotion, throwError }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OperatorCreate);