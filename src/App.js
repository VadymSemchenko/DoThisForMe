import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';
import { addLocaleData, IntlProvider } from 'react-intl';

import PrivateRoute from './decorators/privateRoute';
import * as Routes from './constants/routes';
import * as Components from './components';
import * as Layouts from './layouts';
import * as Screens from './screens';
import messages from './intl/messages';

addLocaleData(ru);
addLocaleData(en);

const App = ({ userID, lang }) => {
  console.log('LANG', lang);
  return (
    <IntlProvider
      locale={lang}
      messages={messages[lang]}
      key={lang}
    >
      <Router>
        <Fragment>
          <Layouts.Header/>
          <Switch>
            <PrivateRoute path={Routes.OPERATOR_CREATE} component={Components.OperatorCreate} condition={userID} redirectRoute={Routes.SIGN_IN} />
            <PrivateRoute path={Routes.REQUESTOR} component={Components.RequestorMain} condition={userID} redirectRoute={Routes.SIGN_IN} />
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
    </IntlProvider>
    );
};

App.propTypes = {
    userID: string.isRequired,
};

const mapStateToProps = ({ authReducer: { userID }, langReducer: { lang } }) => ({ userID, lang });

export default connect(mapStateToProps)(App);