import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import firebase from 'firebase'
import { grey } from '@material-ui/core/colors';

<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>

var firebaseConfig = {
  apiKey: "AIzaSyDndtZWxGbteNSLobZ5O2CmS1fyX-2sAGg",
  authDomain: "count-of-money-dev.firebaseapp.com",
  databaseURL: "https://count-of-money-dev.firebaseio.com",
  projectId: "count-of-money-dev",
  storageBucket: "count-of-money-dev.appspot.com",
  messagingSenderId: "516320172645",
  appId: "1:516320172645:web:cfb490ef4bf66a96d3848c",
  measurementId: "G-5N4WKF17VF"
};

firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
      light: grey[100],
      dark: grey[900]
    },
    type: "light"
  }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>,
  document.getElementById('root')
);