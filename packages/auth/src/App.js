import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {
  StylesProvider,
  createGenerateClassName,
} from '@mui/styles';

import theme from './themes'
import Signin from './views/pages/authentication/authentication3/Login3';
import Signup from './views/pages/authentication/authentication3/Register3';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StyledEngineProvider>
        <ThemeProvider theme={theme({})}>
          <CssBaseline />
            <Router history={history}>
              <Switch>
                <Route path="/auth/signin">
                  <Signin onSignIn={onSignIn} />
                </Route>
                <Route path="/auth/signup">
                  <Signup onSignIn={onSignIn} />
                </Route>
              </Switch>
            </Router>

        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};
