import { createBrowserHistory } from 'history';
import Progress from './components/Progress';
import Header from './components/Header';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Layout from './layouts/dashboard/layout';
import storage from './utils/storage';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const CpanelLazy = lazy(() => import('./components/CpanelApp'));

import theme from './themes';

const history = createBrowserHistory();

const theTheme = theme({});

const Routes = () => {
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return storage.getAuthToken();
  });

  useEffect(() => {
    if (isSignedIn && location.pathname === '/auth/signin') {
      return history.push('/cpanel/dashboard');
    }
    if (!isSignedIn && location.pathname !== '/auth/signin') {
      history.push('/shop');
    }
  }, [isSignedIn]);

  return (
    <Switch>
      <Route path="/auth">
        <Suspense fallback={<Progress />}>
          <AuthLazy onSignIn={() => setIsSignedIn(true)} onSignOut={() => setIsSignedIn(false)} />
        </Suspense>
      </Route>
      <Route path="/cpanel">
        {!isSignedIn && <Redirect to="/shop" />}
        <Layout>
          <Suspense fallback={<Progress />}>
            <CpanelLazy />
          </Suspense>
        </Layout>
      </Route>
      <Route path="/shop">
        <Suspense fallback={<Progress />}>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <MarketingLazy />
        </Suspense>
      </Route>
      <Route path="/">
        <Redirect to="/shop" />
      </Route>
    </Switch>
  );
};

export const App = () => {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theTheme}>
        <CssBaseline />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
