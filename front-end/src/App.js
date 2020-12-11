import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Grid } from '@material-ui/core';
import { UserProvider } from './context/userContext';
import { Routes } from './Routes';
import { LimitProvider } from './context/limitContext';
import { CsrfProvider } from './context/csrfContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {
  var config = {
    method: 'get',
    url: 'http://localhost:8000/csrf',
    withCredentials: true,
    headers: {}
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.content.csrfToken);
      console.log('Cookie == ? ', Cookies.get('_csrf'));

      // axios
      //   .get('http://localhost:8000/test', { withCredentials: true })
      //   .then((res) => console.log('Nice', res.data))
      //   .catch((err) => {
      //     console.log('not hit');
      //     /* not hit since no 401 */
      //   });

      axios('http://localhost:8000/test', {
        method: 'post',
        data: {
          _csrf: response.data.content.csrfToken
        },
        withCredentials: true
      }).then(function (res) {
        console.log('MOTHERFKIN WOW ????', res);
      });

      // axios('http://localhost:8000/test', {
      //   method: 'POST',
      //   body: {
      //     _csrf: response.data.content.csrfToken,
      //     favoriteColor: 'ReallyMyNiG?'
      //   },
      //   withCredentials: true
      // }).then(function (res) {
      //   alert('GGGGG!');
      // });
    })
    .catch(function (error) {
      console.log(error);
    });

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

                <Routes />
              </UserProvider>
            </LimitProvider>
          </CsrfProvider>
        </Router>
      </Grid>
    </div>
  );
};

export default App;
