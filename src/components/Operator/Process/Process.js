import React, { Component } from 'react';
import { TextField, Grid } from '@material-ui/core';

class OperatorProcess extends Component {
    render() {
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <TextField value="motionId" disabled/>
            </Grid>
        );
    }
}


export default OperatorProcess;