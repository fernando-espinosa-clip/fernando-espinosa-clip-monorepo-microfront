import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import theme from './themes'
import Landing from './components/Landing';
import Pricing from './components/Pricing';



const Default = () => {
  return <div>Estas en Root</div>
}

export default ({ history }) => {
  return (
      <div>
        <StyledEngineProvider>
          <ThemeProvider theme={theme({})}>
            <CssBaseline />
            <Router history={history}>
              <Switch>
                <Switch>
                  <Route exact path="/shop/pricing" component={Pricing} />
                  <Route path="/shop" component={Landing} />
                </Switch>
              </Switch>
            </Router>

          </ThemeProvider>
        </StyledEngineProvider>
      </div>
  );
};
