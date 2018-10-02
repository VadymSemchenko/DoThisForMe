import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';

import * as ROUTES from '../../constants/routes';
import { routeToLink } from '../../helpers/routeToLink';

const Footer = ({ location }) => {
    const { pathname } = location;
    const links = (
        (pathname === '/')
            ? [routeToLink(ROUTES.PRIVACY_POLICY), routeToLink(ROUTES.TERMS_OF_SERVICE), routeToLink(ROUTES.ABOUT_US)]
            : [routeToLink(ROUTES.HOME), routeToLink(ROUTES.ABOUT_US)]
    );
    return (
        <Grid justify="center" container>
            {links.map((linkItem, idx) => {
                const { text, route } = linkItem;
                const classNames = cx('footerLink', { noBorder: idx === 0 });
                return (
                    <Grid key={text} item={true}>
                        <Link
                            className={classNames}
                            to={route}
                            key={text}
                            children={text}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default withRouter(Footer);
