import React, { Fragment } from 'react';
import { func, bool, string } from 'prop-types';
import { AppBar, Button, Typography, LinearProgress, Grid, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

import { attemptSignIn, attemptSignOut, deleteError } from '../../store/actionCreators';
import { clearStorage } from '../../store/';
import { SIGN_IN } from '../../constants/routes';
import styles from './styles';
import { LanguageSelect } from '../../components';

const Header = ({
  isLoading,
  userID,
  attemptSignIn,
  attemptSignOut,
  error,
  deleteError,
  location: {
    pathname
  },
  classes
}) => {
  const isAuth = !!userID;
  const btnColor = isAuth ? 'secondary' : 'primary';
  const btnTitle = isAuth ? <FormattedMessage id="signOut" defaultMessage="Sign Out" /> : <FormattedMessage id="signIn" defaultMessage="Sign In" />;
  const btnOnClick = isAuth ? attemptSignOut : attemptSignIn;
  const isError = !!error;
  const needsAuthButton = pathname !== SIGN_IN;
  return (
    <header className={classes.header}>
      <Dialog open={isError} onClose={deleteError}>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={deleteError}
            color="primary"
            autoFocus={true}
            children={'OK'}
          />
        </DialogActions>
      </Dialog>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Grid
          container
          justify="space-between"
          wrap="nowrap"
        >
          <Grid item xs={12}
          >
            <Typography variant="display3" align="center" gutterBottom={true}>
              <FormattedMessage id="label" defaultMessage="Do This For Me"/>
            </Typography>
            {isLoading && <LinearProgress />}
          </Grid>
            {needsAuthButton && (
              <Grid item xs={2} container justify="flex-end" alignItems="flex-start" className={classes.rightButtons} >
                <Grid item>
                  <Button
                    variant="contained"
                    color={btnColor}
                    onClick={btnOnClick}
                    children={btnTitle}
                    className={classes.button}
                  />
                </Grid>
                <Grid item>
                  <LanguageSelect buttonClass={classes.button} />
                </Grid>
              </Grid>
            )}
        </Grid>
      </AppBar>
    </header>
  );
};

const mapStateToProps = ({ loadingReducer: { isLoading }, authReducer: { userID }, errorReducer: { error } }) => ({ isLoading, userID, error });
const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut, deleteError }, dispatch);

Header.propTypes = {
  userID: string.isRequired,
  isLoading: bool.isRequired,
  attemptSignIn: func.isRequired,
  attemptSignOut: func.isRequired
};



export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
  )(Header);
