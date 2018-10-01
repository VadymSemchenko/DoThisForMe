import React, { Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes, { bool, string, func, number, shape } from 'prop-types';


import PrivateRoute from './decorators/privateRoute';
import * as Routes from './constants/routes';
import * as Components from './components';
import * as Layouts from './layouts';
import * as Screens from './screens';

const App = ({ uid }) => {
  console.log(uid);
  return (
    <Fragment>
      <Layouts.Header/>
      <Switch>
        <PrivateRoute path={Routes.MOTION_CREATE} component={Components.OperatorCreate} condition={uid} redirectRoute={Routes.HOME} />
        <PrivateRoute path={Routes.MOTION_PROCESS} component={Components.OperatorProcess} condition={uid} redirectRoute={Routes.HOME} />
        <Route exact path={Routes.HOME} component={Components.Home}/>
        <Route path={Routes.PRIVACY_POLICY} component={Screens.InfoPage} />
        <Route path={Routes.TERMS_OF_SERVICE} component={Screens.InfoPage} />
        <Route path={Routes.ABOUT_US} component={Screens.InfoPage} />
        <Route path={Routes.HOW_IT_WORKS} component={Screens.InfoPage} />
        <Route component={Screens.NotFound} />
      </Switch>
      <Layouts.Footer/>
    </Fragment>
  );
};

App.propTypes = {
  uid: string.isRequired,
  history: shape({
    length: number.isRequired,
    push: func.isRequired,
    replace: func.isRequired
  }).isRequired,
  location: shape({
    pathname: string.isRequired
  }).isRequired,
  match: shape({
    isExact: bool,
    path: string.isRequired,
    url: string.isRequired
  }).isRequired,
};

const mapStateToProps = ({ authReducer: { uid } }) => ({ uid });

export default withRouter(connect(mapStateToProps)(App));
