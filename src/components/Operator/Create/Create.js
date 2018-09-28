import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { TimePicker } from 'material-ui-time-picker';
import { Link } from 'react-router-dom';
import { MOTION_PROCESS } from '../../../constants/routes';
import { database } from '../../../firebase';

let inAnHour = new Date;
inAnHour.setHours(inAnHour.getHours() + 1);

const motionsRef = database.ref('motions');

class OperatorCreate extends Component {
    state = {
        clockIsOpen: false,
        time: inAnHour,

    };

    componentDidMount() {
        motionsRef.on('value', (snapshot) => {
            console.log(snapshot.val())
        })
    }

    // componentWillMount() {
    //     motionsRef.on('value', (snapshot) => {
    //         console.log(snapshot)
    //     })
    // }

    render() {
        console.log(database);
        const { time } = this.state;
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
                    placeholder="Your name or short description"
                    label="I plan to mote soon"
                    />
                </Grid>
                <Grid item>
                    <TextField
                    placeholder="What I can do for people"
                    label="What you can do or deliver"
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
                    value={this.state.time}
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

    createMotion = () => {
        const pushName = motionsRef.push('test');
        console.log(pushName.name());
    };
}

export default OperatorCreate;