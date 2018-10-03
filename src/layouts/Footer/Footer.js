import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';

import { linkRoutes } from '../../constants/routes';
import { routeToText } from '../../helpers/routeToText';

const Footer = ({ location: { pathname } }) => {

    return (
        <Grid justify="center" container>
            {linkRoutes.map((route, idx) => {
                const text = routeToText(route);
                const classNames = cx('footerLink', { noBorder: idx === 0 || (pathname === linkRoutes[0] && idx === 1 )});
                return route === pathname ? null : (
                    <Grid key={text} item={true}>
                        <Link
                            className={classNames}
                            to={route}
                            children={text}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default withRouter(Footer);
