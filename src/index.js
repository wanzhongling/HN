import './App.js';
import { render } from 'react-dom';
import React from 'react';
import { Router, Route,browserHistory} from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history';

const history = useBasename(createHashHistory)({
  //queryKey:false,
  //basename: '/os'
});
history.__v2_compatible__ = true;

import App from './App'; //布局

React.render(
  <Router history={history}>
    <Route path="/" component={App}>
    </Route>
  </Router>,
  document.getElementById('app')
)

