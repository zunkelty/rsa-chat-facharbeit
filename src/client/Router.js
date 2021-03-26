import React, { Component } from 'react';
import './app.css';
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import { Suspense, lazy } from 'react';

const SetupPage = React.lazy(() => import('./pages/Setup/Setup.page'));
const ChatPage = React.lazy(() => import('./pages/Chat/Chat.page'));

import Loader from './assets/loader-ring-black-minimized.gif';
import MatchPage from './pages/Match/Match.page';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  console.log('Error status', error.response.status)
  if (error.response.status === 401) {
    console.log('Redirecting to logout')
    location.replace('/');
  }
  return Promise.reject(error);
});

export default class MainRouter extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div className="page loading"><img src={Loader} /><p>Wird geladen...</p></div>}>
          <Switch>
            <Route path="/" exact component={SetupPage} />
            <Route path="/match" exact component={MatchPage} />
            <Route path="/chat/:chatId" exact component={ChatPage} />
            <Route children={<p>Hier ist nichts zu sehen. Hast du einen falschen Link?</p>} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
