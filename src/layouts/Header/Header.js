import React, { Fragment } from 'react';
import { func, bool, string } from 'prop-types';
import { AppBar, Button, Typography, LinearProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { attemptSignIn, attemptSignOut, deleteAuthError } from '../../store/actionCreators';

const Header = ({ isLoading, uid, attemptSignIn, attemptSignOut, deleteAuthError, error }) => {
  const button = uid ? {
    text: 'Sign Out',
    onClick: attemptSignOut,
    color: 'secondary'
  } : {
    text: 'Sign In',
    onClick: attemptSignIn,
    color: 'primary'
  };
  const { color, onClick, text } = button;
  return (
   <Fragment>
    <Dialog
    open={Boolean(error)}
    onClose={deleteAuthError}
    >
      <DialogTitle id="alert-dialog-title">ERROR!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteAuthError} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
    <AppBar position="static" color="default">
      <Typography variant='display4' align='center' gutterBottom>
          Do This For Me
        </Typography>
        {isLoading && (
          <LinearProgress />
        )}
        <Button variant="contained" color={color}onClick={onClick}>{text}</Button>
    </AppBar>
   </Fragment>
  );
}

const mapStateToProps = ({ loadingReducer: { isLoading }, authReducer: { uid }, errorReducer: { error } }) => ({ isLoading, uid, error });
const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut, deleteAuthError }, dispatch);

Header.propTypes = {
  uid: string.isRequired,
  isLoading: bool.isRequired,
  attemptSignIn: func.isRequired,
  attemptSignOut: func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);