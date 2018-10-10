import React from 'react';
import { Grid } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { uiConfig, auth } from '../../firebase';

const SignIn = () => (
    <Grid
        container
        direction="column"
        alignItems="center"
    >
        <Grid item>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={auth}
        />
        </Grid>
    </Grid>
);

export default SignIn;