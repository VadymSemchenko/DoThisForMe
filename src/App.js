import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import PrivateRoute from './decorators/privateRoute';
import * as Routes from './constants/routes';
import * as Components from './components';
import * as Layouts from './layouts';
import * as Screens from './screens';

const App = ({ userID }) => {
  return (
    <Router>
      <Fragment>
        <Layouts.Header/>
        <Switch>
          <PrivateRoute path={Routes.OPERATOR_CREATE} component={Components.OperatorCreate} condition={userID} redirectRoute={Routes.SIGN_IN} />
          <PrivateRoute path={Routes.REQUESTOR} component={Components.RequestorMain} condition={userID} redirectRoute={Routes.SIGN_IN} />
          {/* <PrivateRoute path={`${Routes.DEALS}/:motionId/:requestorId`} component={Components.DealScreen} condition={userID} redirectRoute={Routes.SIGN_IN} /> */}
          <PrivateRoute path={Routes.OPERATOR} component={Components.OperatorManage} condition={userID} redirectRoute={Routes.SIGN_IN} />
          <PrivateRoute path={Routes.SIGN_IN} component={Components.SignIn} condition={!userID} />
          <Route exact path={Routes.HOME} component={Components.Home} />
          <Route path={Routes.PRIVACY_POLICY} component={Screens.InfoPage} />
          <Route path={Routes.TERMS_OF_SERVICE} component={Screens.InfoPage} />
          <Route path={Routes.ABOUT_US} component={Screens.InfoPage} />
          <Route path={Routes.HOW_IT_WORKS} component={Screens.InfoPage} />
          <Route component={Screens.NotFound} />
        </Switch>
        <Layouts.Footer />
      </Fragment>
    </Router>
    );
};

App.propTypes = {
    userID: string.isRequired,
};

const mapStateToProps = ({ authReducer: { userID } }) => ({ userID });

export default connect(mapStateToProps)(App);