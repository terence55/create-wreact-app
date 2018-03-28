import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../models/utils/configureStore';
import Home from './home';

const context = require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.js$/);
const keys = context.keys();
const children = [];
for (let i = 0; i < keys.length; i++) {
  children.push(context(keys[i]).default || context(keys[i]));
}

const routes = (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/' component={Home.component} exact />
        {children.map(route => <Route path={route.path} key={route.path} component={route.component} />)}
        <Redirect to='/' />
      </Switch>
    </HashRouter>
  </Provider>
);

export default routes;
