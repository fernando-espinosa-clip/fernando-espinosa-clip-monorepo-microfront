import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {
  createGenerateClassName,
} from '@mui/styles';
import axios from 'axios';

import theme from './themes'
import SignIn from './views/pages/authentication/authentication3/Login3';
import Signup from './views/pages/authentication/authentication3/Register3';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

const SignOut = ({ onSignOut, storage }) => {
  storage.deleteCookie('dev_access_token')
  onSignOut();
  return null
}

const Default = () => {
  useEffect(() => {
    axios.get('/api/blogs').then((r) => console.log(r.data))
  }, []);
  return <div>Estas en Root</div>
}

export default ({ history, ...rest }) => {
  return (
    <div>
      <StyledEngineProvider>
        <ThemeProvider theme={theme({})}>
          <CssBaseline />
            <Router history={history}>
              <Switch>
                <Route path="/" exact>
                  <Default />
                </Route>
                <Route path="/auth/signin">
                  <>
                    <Default />
                    <SignIn {...rest} />
                  </>
                </Route>
                <Route path="/auth/signup">
                  <Signup {...rest} />
                </Route>
                <Route path="/auth/signout">
                  <SignOut {...rest} />
                </Route>
              </Switch>
            </Router>

        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};
