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

const Header = (props) => {
  const { isLoading, uid, attemptSignIn, attemptSignOut } = props;
  const isAuth = !!uid;
  const btnColor = isAuth ? 'secondary' : 'primary';
  const btnTitle = isAuth ? 'Sign Out' : 'Sign In';
  const btnOnClick = isAuth ? attemptSignOut : attemptSignIn;
  const isError = !!error;
  return (
    <Fragment>
      <Dialog open={isError} onClose={deleteAuthError}>
        <DialogTitle>ERROR!</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={deleteAuthError}
            color="primary"
            autoFocus={true}
            children={'Agree'}
          />
        </DialogActions>
      </Dialog>
      <AppBar position="static" color="default">
        <Typography variant="display4" align="center" gutterBottom={true}>Do This For Me</Typography>
        {isLoading && <LinearProgress />}
        <Button
          variant="contained"
          color={btnColor}
          onClick={btnOnClick}
          children={btnTitle}
        />
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = ({ loadingReducer: { isLoading }, authReducer: { uid }, errorReducer: { error } }) => ({ isLoading, uid, error });
const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut, deleteAuthError }, dispatch);

Header.propTypes = {
  uid: string.isRequired,
  isLoading: bool.isRequired,
  attemptSignIn: func.isRequired,
  attemptSignOut: func.isRequired
};

Header.defaultProps = {
  uid: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
