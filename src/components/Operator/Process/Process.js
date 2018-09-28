import React, { Component } from 'react';
import { TextField, Grid } from '@material-ui/core';

class OperatorProcess extends Component {
    state = {};
    render() {
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <TextField value="motionId"/>
            </Grid>
        );
    }
}

export default OperatorProcess;