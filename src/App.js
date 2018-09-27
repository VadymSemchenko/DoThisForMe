import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import * as Routes from './constants/routes';
import * as Components from './components';
import * as Layouts from './layouts';
import * as Screens from './screens';
// require('dotenv').config();
// require('dotenv').config();

const App = props => {
  console.log(props);
    return (
          <Fragment>
            <Layouts.Header/>
            <Switch>
              <Route exact path={Routes.HOME} component={Components.Home}/>
              <Route path={Routes.PRIVACY_POLICY} component={Screens.InfoPage} />} />
              <Route path={Routes.TERMS_OF_SERVICE} component={Screens.InfoPage} />} />
            </Switch>
            <Layouts.Footer/>
          </Fragment>
    );
  }

export default withRouter(App);
