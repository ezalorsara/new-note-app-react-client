import React, { useState } from 'react';
import  PageWrapper  from './containers/pageWrapper';
import { useSelector } from 'react-redux';


// PAGES 
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Header from './components/Header';


import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App: React.FC = () => {

  return (
    <Router>
      <div>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register" component={Signup}></Route>
          <Route path="/login" component={Signin}></Route>
          <Route path="/"></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
