import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import Register from "./components/Register"
import {Currencies} from './ressources/currencies/CurrenciesWidget'
import {Feeds} from './ressources/feeds/FeedsWidget'

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/feeds" component={ Feeds } />
        <Route exact path="/currencies" component={ Currencies } />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
