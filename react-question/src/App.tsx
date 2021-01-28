import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import PreviousState from './lesson/previous-state/PreviousState';
import StaleCallback from './lesson/stale-callback/StaleCallback';
import StaleCallbackFix from './lesson/stale-callback/StaleCallbackFix';

function App() {
  return (
    <div className="App">
      <div className="link">
        <Link to="stale-callback">Stale Callback</Link>
        <Link to="stale-callback-fix">Stale Callback Fix</Link>
        <Link to="previous-state">Previous State</Link>
      </div>
      <Switch>
        <Route path="/stale-callback" component={StaleCallback} />
        <Route path="/stale-callback-fix" component={StaleCallbackFix} />
        <Route path="/previous-state" component={PreviousState} />
      </Switch>
    </div>
  );
}

export default App;
