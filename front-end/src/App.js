import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from "./components/Navbar";
import { Grid } from "@material-ui/core";
import { UserProvider } from "./context/userContext";
import { Routes } from './Routes';
import { LimitProvider } from "./context/limitContext";
import { CsrfProvider } from "./context/csrfContext";

const App = () => {
  
  return (
    <div>
      <Grid container direction="column" spacing={2}>
          <Router>
            <CsrfProvider>
              <LimitProvider>
                <UserProvider>

                  <Grid item>
                    <Navbar></Navbar>
                  </Grid>

                  <Routes/>
                </UserProvider>
              </LimitProvider>
            </CsrfProvider>
          </Router>
      </Grid>

    </div>
  );
};

export default App;
