import { render } from 'react-dom';
import React from 'react';
import { Router, Route,browserHistory,DefaultRoute} from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history';
const history = useBasename(createHashHistory)({
  //queryKey:false,
  //basename: '/os'
});
history.__v2_compatible__ = true;

import Layout from './app/App/Layout.js'; //布局
import NotFound from './app/NotFound/index.jsx'; // 404
import Login from './app/Login/index.js'; // login
import List from './component/View.js'; // List

React.render(
  <Router history={history}>
    <Route path="/" component={Layout}>
      <Route path="login" component={Login} />
      <Route path="list" component={List} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('app')
)

