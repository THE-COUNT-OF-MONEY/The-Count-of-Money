
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
      light: grey[100],
      dark: grey[900]
    },
    type: "light"
  }
})
