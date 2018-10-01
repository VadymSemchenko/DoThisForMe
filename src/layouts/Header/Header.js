import React from 'react';
import { func, bool, string } from 'prop-types';
import { AppBar, Button, Typography, LinearProgress } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { attemptSignIn, attemptSignOut } from '../../store/actionCreators';

const Header = (props) => {
  const { isLoading, uid, attemptSignIn, attemptSignOut } = props;
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
    <AppBar position="static" color="default">
      <Typography variant='display4' align='center' gutterBottom>
          Do This For Me
        </Typography>
        {isLoading && (
          <LinearProgress />
        )}
        <Button variant="contained" color={color}onClick={onClick}>{text}</Button>
    </AppBar>
  );;
}

const mapStateToProps = ({ loadingReducer: { isLoading }, authReducer: { uid } }) => ({ isLoading, uid });
const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut }, dispatch);

Header.propTypes = {
  uid: string,
  isLoading: bool.isRequired,
  attemptSignIn: func.isRequired,
  attemptSignOut: func.isRequired
};

Header.defaultProps = {
  uid: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);