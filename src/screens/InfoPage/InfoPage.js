import React from 'react';
import { Typography } from "@material-ui/core";
import { routeToText } from '../../helpers/routeToText';

const InfoPage = ({ location: { pathname } }) => (
    <Typography
        variant="h4"
        align="center"
        gutterBottom={true}
        children={routeToText(pathname)}
    />
);

export default InfoPage;