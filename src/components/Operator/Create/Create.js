import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { TimePicker } from 'material-ui-time-picker';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MOTION_PROCESS } from '../../../constants/routes';
import { initMotion } from '../../../store/actionCreators';
// import { handleTextChange } from '../../../helpers/handleTextChange';

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
                    value={displayName}
                    disabled
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
        this.setState(() => ({ time }));
    };

    toggleClock = () => {
        this.setState((prevState) => ({ clockIsOpen: !prevState.clockIsOpen }));
    }

    createMotion = async () => {
        const { uid, displayName, initMotion, history } = this.props;
        const { value, time } = this.state;
        const newMotion = {
            displayName,
            value,
            uid,
            time: time.toLocaleTimeString()
        };
        const responce = await initMotion(newMotion);
        if(responce){
            history.push(MOTION_PROCESS);
        }
    };
}

const mapStateToProps = ({ authReducer: { displayName, uid } }) => ({ displayName, uid });
const mapDispatchToProps = dispatch => bindActionCreators({ initMotion }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OperatorCreate);