import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';
import React, { useEffect, useState,Suspense, lazy } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Layout from './layouts/dashboard/layout'

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const CpanelLazy = lazy(() => import('./components/CpanelApp'));

import theme from './themes'

const Default = () => {
  return <div>Estas en Root</div>
}

const history = createBrowserHistory();

const theTheme = theme({})

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if (isSignedIn) {
      history.push('/cpanel/dashboard');
    }
  }, [isSignedIn]);
  console.log(theTheme)
  return (
        <StyledEngineProvider>
          <ThemeProvider theme={theTheme}>
            <CssBaseline />
            <Router history={history}>
                <Suspense fallback={<Progress />}>
                  <Switch>
                    <Route path="/auth">
                      <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                    </Route>
                    <Route path="/cpanel">
                      {!isSignedIn && false && <Redirect to="/" />}
                      <Layout>
                        <CpanelLazy />
                      </Layout>
                    </Route>
                    <Route path="/">
                      <>
                        <Header
                            onSignOut={() => setIsSignedIn(false)}
                            isSignedIn={isSignedIn}
                        />
                        <MarketingLazy/>
                      </>
                    </Route>
                  </Switch>
                </Suspense>
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