import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, condition, redirectRoute, ...rest }) => (
    <Route {...rest} render={(props) => (
      condition ? <Component {...props} /> : <Redirect to={redirectRoute} />
    )} />
  );



  export default PrivateRoute;