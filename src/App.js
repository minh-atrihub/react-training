import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './components/Main';
import New from './components/New';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
