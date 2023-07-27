import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';
import React, { useEffect, useState,Suspense, lazy } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
// const DashboardLazy = lazy(() => import('./components/DashboardApp'));

import theme from './themes'

const Default = () => {
  return <div>Estas en Root</div>
}

const history = createBrowserHistory();

const MarketingLazy = () => {
  return <div>Public Root</div>
}

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);
  return (
        <StyledEngineProvider>
          <ThemeProvider theme={theme({})}>
            <CssBaseline />
            <Router history={history}>
              <div>
                <Header
                    onSignOut={() => setIsSignedIn(false)}
                    isSignedIn={isSignedIn}
                />
                <Suspense fallback={<Progress />}>
                  <Switch>
                    <Route path="/auth">
                      <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                    </Route>
                    { /* && (<Route path="/dashboard">
                      {!isSignedIn && <Redirect to="/" />}
                      <DashboardLazy />
                    </Route>) */
                    }
                    <Route path="/" component={MarketingLazy} />
                  </Switch>
                </Suspense>
              </div>
            </Router>

          </ThemeProvider>
        </StyledEngineProvider>
  );
};



/*
export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>

      </StylesProvider>
    </Router>
  );
};
*/