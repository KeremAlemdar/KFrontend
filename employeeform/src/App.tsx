import React from 'react';
import './App.css';
import { Home } from './Home';
import { Navigation } from './Navigation';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Employee  from './Employee';

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation></Navigation>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employee">Employee</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
