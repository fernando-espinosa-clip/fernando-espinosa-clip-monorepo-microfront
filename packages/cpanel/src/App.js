import React, { Suspense } from 'react';
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
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

import { createTheme } from './themes';

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 36 * (60 * 60 * 1000), // 5 mins
      // cacheTime: 36 * (60 * 60 * 1000), // 36 horas
    },
  },
});

export default function App(props) {
  const { history, ...rest } = props;
  const { storage } = props;
  const serialize = React.useCallback(
    (str) => {
      return storage.enc(str);
    },
    [storage]
  );
  const deserialize = React.useCallback(
    (str) => {
      return JSON.parse(storage.dec(str)); //storage.dec(str);
    },
    [storage]
  );
  const localStoragePersistor = React.useMemo(
    () => createWebStoragePersistor({ storage: window.localStorage, serialize, deserialize }),
    [deserialize, serialize]
  );
  React.useEffect(
    () =>
      persistQueryClient({
        queryClient,
        persistor: localStoragePersistor,
      }),
    [localStoragePersistor]
  );
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
                <Suspense fallback="loading">
                  <Dashboard {...rest} />
                </Suspense>
              </Route>
              <Route path="/cpanel/settings">
                <Settings />
              </Route>
              <Route path="/cpanel/account">
                <Account />
              </Route>
              <Route path="/cpanel/customers">
                <Customers {...rest} />
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
