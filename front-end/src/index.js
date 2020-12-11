import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { grey } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

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