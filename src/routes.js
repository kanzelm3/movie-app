import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Layout from './layout/BaseLayout';
import Movies from './containers/Movies';

export default (
  <Route path="/" component={Layout}>
    <IndexRedirect to="movies" />
    <Route path="movies" component={Movies} />
  </Route>
);
