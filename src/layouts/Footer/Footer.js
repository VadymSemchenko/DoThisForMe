import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';

import { linkRoutes } from '../../constants/routes';
import { routeToText } from '../../helpers/routeToText';

const styles = {
    footer: {
        paddingTop: "3vh",
        height: "5vh",
        paddingBottom: "2vh"
    }
};

const Footer = ({ location: { pathname }, classes: { footer } }) => (
        <Grid justify="center" container className={footer}>
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

export default compose(
    withRouter,
    withStyles(styles)
    )(Footer);
