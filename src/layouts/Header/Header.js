import React, { Fragment } from 'react';
import { func, bool, string } from 'prop-types';
import { AppBar, Button, Typography, LinearProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { attemptSignIn, attemptSignOut, deleteError } from '../../store/actionCreators';
import { clearStorage } from '../../store/';
import { SIGN_IN } from '../../constants/routes';

const Header = ({
  isLoading,
  userID,
  attemptSignIn,
  attemptSignOut,
  error,
  deleteError,
  location: {
    pathname
  }
}) => {
  const isAuth = !!userID;
  const btnColor = isAuth ? 'secondary' : 'primary';
  const btnTitle = isAuth ? 'Sign Out' : 'Sign In';
  const btnOnClick = isAuth ? attemptSignOut : attemptSignIn;
  const isError = !!error;
  const needsAuthButton = pathname !== SIGN_IN;
  return (
    <Fragment>
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
      <AppBar position="static" color="default">
        <Typography variant="display3" align="center" gutterBottom={true}>Do This For Me</Typography>
        {isLoading && <LinearProgress />}
        {needsAuthButton &&
        <Button
          variant="contained"
          color={btnColor}
          onClick={btnOnClick}
          children={btnTitle}
        />}
        <Button
          onClick={clearStorage}
          variant='outlined'
          children='clear storage'
        />
      </AppBar>
    </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
