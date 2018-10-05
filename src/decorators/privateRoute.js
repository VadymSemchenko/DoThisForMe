import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { throwError } from '../store/actionCreators';
import { SIGN_IN, HOME } from '../constants/routes';
import queryString from 'query-string';

const PrivateRoute = (props) => {
  const { component: Component, condition, redirectRoute = '', location: { pathname, search }, throwError, ...rest } = props;
  let finalRoute;
  if(!condition){
    let message;
    if(redirectRoute === SIGN_IN){
      message = 'You have to be authorised to view this page!';
      finalRoute = `${redirectRoute}?from=${pathname}`;
    } else if(pathname === SIGN_IN && !search){
      message = 'You have already signed in!';
      finalRoute = HOME;
    } else if(pathname === SIGN_IN && search && search.includes('from=')){
      finalRoute = queryString.parse(search).from;
    }
    if(message){
    throwError(message);
    }
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        condition
          ? <Component {...props} />
          : <Redirect to={finalRoute} />
      )}
    />
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({ throwError }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(PrivateRoute));
