import React from 'react';
import { Paper, Typography } from '@material-ui/core/';

const NotFound = () => (
    <Paper>
        <Typography variant='display4' align='center' gutterBottom>
            Incorrect URL
        </Typography>
    </Paper>
);

export default NotFound;