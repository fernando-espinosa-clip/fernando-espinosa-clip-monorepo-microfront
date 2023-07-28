import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Dashboard from './views/pages'
import Settings from './views/pages/settings'
import Account from './views/pages/account'
import Customers from './views/pages/customers'

import { createTheme } from './themes'

const theme = createTheme();


export default ({ history }) => {
  return (
    <div>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Router history={history}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to={'/cpanel/dashboard'} />
                </Route>
                <Route path="/cpanel/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/cpanel/settings">
                  <Settings />
                </Route>
                <Route path="/cpanel/account">
                  <Account />
                </Route>
                <Route path="/cpanel/customers">
                  <Customers />
                </Route>
              </Switch>
            </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};
