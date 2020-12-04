import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import Register from "./components/Register"
import Profile from "./components/Profile"
import {Currencies} from './ressources/currencies/CurrenciesWidget'
import {Feeds} from './ressources/feeds/FeedsWidget'
import Navbar from "./components/Navbar";
import { Grid } from "@material-ui/core";
import Users from "./ressources/Users/Users"

import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <div>
      <Grid container direction="column" spacing={2}>
          <Router>
            <UserProvider>

              <Grid item>
                <Navbar></Navbar>
              </Grid>

              <Grid item>
                <Route exact path="/" component={ Currencies } />
                <Route exact path="/feeds" component={ Feeds } />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/users" component={Users} />
              </Grid>

            </UserProvider>
          </Router>
      </Grid>

    </div>
  );
};

export default App;
