import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
import initI18n, { resources } from './i18n';

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath, ...rest }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} {...rest} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
    translators: resources,
  };
};

// If we are in development and in isolation,
// call mount immediately
// if (process.env.NODE_ENV === 'development') {
const devRoot = document.querySelector('#_cpanel-dev-root');

if (devRoot) {
  initI18n();
  mount(devRoot, { defaultHistory: createBrowserHistory() });
}
// }

// We are running through container
// ,and we should export the mount function
export { mount };
