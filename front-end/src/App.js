import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from "./components/Navbar";
import { Grid } from "@material-ui/core";
import { UserProvider } from "./context/userContext";
import { Routes } from './Routes';
import { LimitProvider } from "./context/limitContext";

const App = () => {
  return (
    <div>
      <Grid container direction="column" spacing={2}>
          <Router>
            <UserProvider>
              <LimitProvider>

                <Grid item>
                  <Navbar></Navbar>
                </Grid>

                <Routes/>
              </LimitProvider>
            </UserProvider>
          </Router>
      </Grid>

    </div>
  );
};

export default App;
