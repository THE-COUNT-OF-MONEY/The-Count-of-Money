import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Users from "./ressources/Users/UsersWidget"
//import Dashboard from "./ressources/dashboard/Dashboard";
import {Currencies} from './ressources/currencies/CurrenciesWidget'
import {Feeds} from './ressources/feeds/FeedsWidget'
import Navbar from "./components/Navbar";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <div>
      <Grid container direction="column" spacing={2}>
          <Router>
            <Grid item>
              <Navbar></Navbar>
            </Grid>

            <Grid item>
              <Route exact path="/" component={ Currencies } />
              <Route exact path="/feeds" component={ Feeds } />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/users" component={Users} />
            </Grid>
          
          </Router>
      </Grid>

    </div>
  );
};

export default App;
