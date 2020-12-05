import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from "./components/Navbar";
import { Grid } from "@material-ui/core";
import { UserProvider } from "./context/userContext";
import { Routes } from './Routes';

const App = () => {
  return (
    <div>
      <Grid container direction="column" spacing={2}>
          <Router>
            <UserProvider>

              <Grid item>
                <Navbar></Navbar>
              </Grid>

              <Routes/>

            </UserProvider>
          </Router>
      </Grid>

    </div>
  );
};

export default App;
