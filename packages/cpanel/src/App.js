import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Dashboard from './views/pages'
import Settings from './views/pages/settings'
import Account from './views/pages/account'
import Customers from './views/pages/customers'

import { createTheme } from './themes'

const theme = createTheme();

const Default = () => {
  return <div>Estas en Root</div>
}

export default ({ history }) => {
  return (
    <div>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Router history={history}>
              <Switch>
                <Route path="/" exact>
                  <Default />
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
