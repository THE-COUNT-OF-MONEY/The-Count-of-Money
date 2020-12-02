import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import Register from "./components/Register"

import {Currencies} from './ressources/currencies/CurrenciesWidget'
import {Feeds} from './ressources/feeds/FeedsWidget'

// import {Dashboard} from './ressources/dashboard/Dashboard';
// import {Currencies} from './ressources/currencies/CurrenciesWidget';
// import {Feeds} from "./ressources/feeds/FeedsWidget.js";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/feeds" component={ Feeds } />
        <Route exact path="/currencies" component={ Currencies } />
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
