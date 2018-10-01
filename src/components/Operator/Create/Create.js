import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { TimePicker } from 'material-ui-time-picker';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MOTION_PROCESS } from '../../../constants/routes';
import { initMotion } from '../../../store/actionCreators';

let inAnHour = new Date();
inAnHour.setHours(inAnHour.getHours() + 1);

class OperatorCreate extends Component {
    state = {
        clockIsOpen: false,
        time: inAnHour,
        value: ''
    };

    render() {
        const { uid, displayName } = this.props;
        const { time, value } = this.state;
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <Grid item>
                    <TextField
                    placeholder="Your name"
                    label="I plan to mote soon"
                    name="operatorName"
                    value={displayName}
                    onChange={this.handleTextChange}
                    />
                </Grid>
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
                    variant="raised"
                    color="secondary"
                    component={Link}
                    to={MOTION_PROCESS}
                    onClick={this.createMotion}
                    >
                        Create Motion!
                    </Button>
                </Grid>
            </Grid>
        );
    }

    handleTimeChange = (time) => {
        this.setState(() => ({ time }));
    };

    toggleClock = () => {
        this.setState((prevState) => ({ clockIsOpen: !prevState.clockIsOpen }));
    }

    handleTextChange = ({target: { name, value }}) => {
        this.setState(() => ({ [name]: value }));
    };

    createMotion = (event) => {
        event.preventDefault();
        const { uid, displayName } = this.props;
        const { value, time } = this.state;
        const newMotion = {
            displayName,
            value,
            uid,
            time
        };
        initMotion(newMotion);

    };
}

const mapStateToProps = ({ authReducer: { displayName, uid } }) => ({ displayName, uid });

export default connect(mapStateToProps)(OperatorCreate);