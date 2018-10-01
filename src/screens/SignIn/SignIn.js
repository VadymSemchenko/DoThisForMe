import React from 'react';
import { func } from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { attemptSignIn, attemptSignOut } from '../../store/actionCreators';

const SignIn = ({ attemptSignIn }) => {
  return (
    <div>
      <button
        onClick={attemptSignIn}
      >
        Sign In
      </button>
    </div>
  );
};

SignIn.propTypes = {
  attemptSignIn: func
};

const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut }, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);