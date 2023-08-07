import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './views/pages';
import Settings from './views/pages/settings';
import Account from './views/pages/account';
import Customers from './views/pages/customers';
import Companies from './views/pages/companies';
import NotFound from './views/pages/404';

import { createTheme } from './themes';

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 3 * (60 * 1000), // 3 mins
      cacheTime: 5 * (60 * 1000), // 5 mins
    },
  },
});

export default function App(props) {
  const { history, ...rest } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router history={history}>
            <Switch>
              <Route path="/" exact>
                <Redirect to={'/cpanel/dashboard'} />
              </Route>
              <Route path="/cpanel/dashboard">
                <Dashboard {...rest} />
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
              <Route path="/cpanel/companies">
                <Companies />
              </Route>
              <Route path="/cpanel/404">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}
