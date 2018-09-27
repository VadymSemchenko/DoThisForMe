import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import * as ROUTES from '../../constants/routes';
import { routeToLink } from '../../helpers/routeToLink';


const Footer = ({ location }) => {
  const { pathname } = location;
  const links = pathname === '/'
    ? [routeToLink(ROUTES.PRIVACY_POLICY), routeToLink(ROUTES.TERMS_OF_SERVICE), routeToLink(ROUTES.ABOUT_US)]
    : [routeToLink(ROUTES.HOME), routeToLink(ROUTES.ABOUT_US)];
    return (
    <Grid justify="center" container>
        {links.map((item, index) => {
        const className = index ? 'footerLink' : 'footerLink noBorder';
        return (
        <Grid key={item.text} item>
            <Link
                className={className}
                to={item.route}
                key={item.text}>
                {item.text}
            </Link>
        </Grid>)
        })}
    </Grid>);
};

export default withRouter(Footer);