import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import ExternalApp from './ExternalApp';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/main" component={App}>
    <Route path="/external" component={ExternalApp} />
  </Route>
);